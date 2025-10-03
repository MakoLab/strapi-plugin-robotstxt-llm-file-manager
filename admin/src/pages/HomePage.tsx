import { Main, Button, Flex, Typography, Box, Tabs } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { getTranslation } from '../utils/getTranslation';

type BotConfig = {
  name: string;
  allowed: boolean;
};

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState(0);

  const [robotsBots, setRobotsBots] = useState<BotConfig[]>([
    { name: 'Google Bot', allowed: false },
    { name: 'Google Images', allowed: false },
    { name: 'Google Media Partners', allowed: false },
    { name: 'Google AdsBot', allowed: false },
    { name: 'Google Mobile', allowed: false },
    { name: 'Bing Bot', allowed: false },
    { name: 'MSN Bot', allowed: false },
    { name: 'Apple Bot', allowed: false },
    { name: 'Yandex Bot', allowed: false },
    { name: 'Yandex Images', allowed: false },
    { name: 'Yahoo Search', allowed: false },
    { name: 'DuckDuckGo Bot', allowed: false },
    { name: 'Qwant', allowed: false },
  ]);

  const [llmsBots, setLlmsBots] = useState<BotConfig[]>([
    { name: 'OpenAI GPT', allowed: false },
    { name: 'Anthropic Claude', allowed: false },
    { name: 'Google Gemini', allowed: false },
  ]);

  const [customRules, setCustomRules] = useState('User-agent: *\nDisallow: /admin/');
  const [crawlDelay, setCrawlDelay] = useState('10');
  const [sitemapUrl, setSitemapUrl] = useState('https://yourwebsite.com/sitemap.xml');

  const toggleBot = (index: number, isRobots: boolean) => {
    if (isRobots) {
      const updated = [...robotsBots];
      updated[index].allowed = !updated[index].allowed;
      setRobotsBots(updated);
    } else {
      const updated = [...llmsBots];
      updated[index].allowed = !updated[index].allowed;
      setLlmsBots(updated);
    }
  };

  const currentBots = activeTab === 0 ? robotsBots : llmsBots;
  const isRobotsTab = activeTab === 0;

  return (
    <Main>
      <Box padding={10} background="neutral0">
        <Flex justifyContent="space-between" alignItems="center" marginBottom={6}>
          <Box>
            <Typography variant="alpha" as="h1">
              Robots & LLMs Control
            </Typography>
            <Typography variant="omega" textColor="neutral600">
              Define rules for robots.txt & llms.txt files
            </Typography>
          </Box>
          <Button variant="success">Save</Button>
        </Flex>

        <Tabs.Root value={activeTab} onValueChange={(v: number) => setActiveTab(Number(v))}>
          <Tabs.List aria-label="Robots and LLMs tabs">
            <Tabs.Trigger value={0}>Robots</Tabs.Trigger>
            <Tabs.Trigger value={1}>LLMs</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value={activeTab}>
            <Box background="neutral0" padding={6} borderRadius="md" marginTop={4}>
              <Typography variant="delta" marginBottom={4}>
                1. Access
              </Typography>
              <Typography variant="omega" textColor="neutral600" marginBottom={6}>
                Choose which search engines may crawl your website
              </Typography>

              <Box>
                {currentBots.map((bot, idx) => (
                  <Flex
                    key={idx}
                    justifyContent="space-between"
                    alignItems="center"
                    paddingTop={3}
                    paddingBottom={3}
                    borderColor="neutral200"
                    style={{
                      borderBottom: idx < currentBots.length - 1 ? '1px solid #eaeaef' : 'none',
                    }}
                  >
                    <Typography>{bot.name}</Typography>
                    <Flex gap={3}>
                      <Button
                        variant={!bot.allowed ? 'danger-light' : 'secondary'}
                        size="S"
                        onClick={() => toggleBot(idx, isRobotsTab)}
                        disabled={!bot.allowed}
                      >
                        FALSE
                      </Button>
                      <Button
                        variant={bot.allowed ? 'tertiary' : 'secondary'}
                        size="S"
                        onClick={() => toggleBot(idx, isRobotsTab)}
                        disabled={bot.allowed}
                      >
                        TRUE
                      </Button>
                    </Flex>
                  </Flex>
                ))}
              </Box>

              <Box marginTop={8}>
                <Typography variant="delta" marginBottom={4}>
                  2. Settings for better performing{' '}
                  <Typography variant="omega" textColor="neutral600">
                    (optional)
                  </Typography>
                </Typography>

                <Box marginBottom={4}>
                  <Typography variant="omega" fontWeight="bold" marginBottom={2}>
                    Custom access rules
                  </Typography>
                  <textarea
                    value={customRules}
                    onChange={(e) => setCustomRules(e.target.value)}
                    rows={8}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcdce4',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                    }}
                    placeholder="User-agent: *&#10;Disallow: /admin/"
                  />
                </Box>

                <Box marginBottom={4}>
                  <Typography variant="omega" fontWeight="bold" marginBottom={2}>
                    Crawl delay (in seconds)
                  </Typography>
                  <input
                    type="text"
                    value={crawlDelay}
                    onChange={(e) => setCrawlDelay(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcdce4',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                    placeholder="e.g. 10"
                  />
                </Box>

                <Box marginBottom={4}>
                  <Typography variant="omega" fontWeight="bold" marginBottom={2}>
                    Sitemap url
                  </Typography>
                  <input
                    type="text"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #dcdce4',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                    placeholder="e.g. https://yourwebsite.com/sitemap.xml"
                  />
                </Box>
              </Box>

              <Box marginTop={8}>
                <Typography variant="delta" marginBottom={2}>
                  3. Robots.txt
                </Typography>
                <Typography variant="omega" textColor="neutral600" marginBottom={4}>
                  Url
                </Typography>
                <Typography fontWeight="bold" marginBottom={4}>
                  https://yourwebsite.com/robots.txt
                </Typography>
                <Button variant="secondary">Preview</Button>
              </Box>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Main>
  );
};

export default HomePage;

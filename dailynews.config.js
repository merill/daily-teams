// Product configuration for Daily.Teams.Admin.News.
//
// CommonJS rather than JSON because the classification rules are RegExps.
// Everything the engine needs that is specific to Teams lives here; the code
// in @merill/dailynews-engine is product-neutral and reads from this file.
//
// The source is merill/teams-docs-mirror. The Teams admin documentation
// publishes from MicrosoftDocs/OfficeDocs-SkypeForBusiness-pr, which is not
// public; learn-mirror rebuilds it from Microsoft Learn four times a day, one
// commit per crawl that found a change, at the path of the source file Learn
// built each page from.
//
// The source folder is Teams/ but every page publishes under microsoftteams/.
// Most articles sit flat in that folder, with a few subfolders (rooms/,
// devices/, phones/, privacy/, ...), so products are classified from the
// folder where there is one and from the file name otherwise.

const ICONS = 'https://github.com/DanielBradley1/msicons';
const teamsIcon = (name, match = 'closest') => ({ sourceName: name, sourcePath: `microsoft-teams/dark-purple-${name}.svg`, match });

module.exports = {
  site: {
    name: 'Daily Teams News',
    host: 'daily.teams.admin.news',
    url: 'https://daily.teams.admin.news',
    description: 'A readable record of what changed across Microsoft Teams admin documentation.',
    productName: 'Microsoft Teams',
    audience: 'Microsoft Teams administrators'
  },

  // v1 is the site alone: no subscriber email, no Kit workflow.
  email: { enabled: false },

  brand: {
    wordmark: 'Daily Teams News',
    ogAlt: 'Daily Teams News: Microsoft Teams change intelligence',
    themeStorageKey: 'teams-news-theme',
    tokenStorageKey: 'teams-news-github-token',
    emailEyebrow: 'Daily Teams News',
    logo: 'teams-news-logo.png',
    aboutIcon: '/assets/products/teams.svg',
    uiAssets: ['teams-news-logo.png'],
    extraCss: ''
  },

  // Written into persisted state and published records. Never change these
  // once the site is live: see the engine README.
  identity: {
    docEventPrefix: 'teams-docs',
    batchEventPrefix: 'teams-news',
    kitMarkerPrefix: 'daily-teams-news'
  },

  build: { docsCloneDir: 'teams-docs', detailDays: 30 },

  discord: { botName: 'Teams Scout' },

  ai: {
    schemaPrefix: 'teams',
    subject: 'Teams',
    forbiddenOpeners: ['Microsoft Teams documentation', 'Teams documentation', 'The Teams docs'],
    impactBoost: /policy|policies|teams rooms|direct routing|calling|emergency|meeting|recording|copilot|retire|deprecat|upgrade|powershell/
  },

  docs: {
    source: { owner: 'merill', repo: 'teams-docs-mirror', branch: 'main' },
    // Learn's rendered titles end in this; it is not part of the page's name.
    titleSuffix: / \| Microsoft Learn$/,
    learnRootUrl: 'https://learn.microsoft.com/en-us/microsoftteams/',

    // Any article under Teams/, except the fragment directories, which are
    // included into other pages and have no URL of their own.
    trackedPaths: /^(Teams)\/(?!(?:.*\/)?(?:includes?|media|breadcrumb)\/).+\.md$/,

    // The folder is Teams/, the Learn path microsoftteams/. Learn lowercases
    // the path but ignores case, so the mirror's mixed-case names resolve.
    learnRoutes: [
      { match: /^Teams\/(.*)\.md$/, path: 'microsoftteams/$1' }
    ],

    areas: {
      stripPrefix: /^Teams\//,
      rules: [
        { match: /^rooms\//, name: 'Teams Rooms' },
        { match: /^devices\//, name: 'Teams devices' },
        { match: /^phones\//, name: 'Teams phones' },
        { match: /^phone-number-calling-plans\//, name: 'Calling Plans' },
        { match: /^privacy\//, name: 'Privacy' },
        { match: /^teams-analytics-and-reports\//, name: 'Analytics and reports' },
        { match: /^alerts\//, name: 'Alerts' },
        { match: /^teams-live-events\//, name: 'Live events' },
        { match: /^teams-add-on-licensing\//, name: 'Add-on licensing' },
        { match: /^expand-teams-across-your-org\//, name: 'Rollout and adoption' }
      ],
      fallback: 'Microsoft Teams'
    }
  },

  analytics: { piqoSite: '' },

  messageCenter: { servicePattern: /\bMicrosoft Teams\b|\bTeams Rooms\b|\bTeams Phone\b/i },

  links: {
    related: [],
    footer: [],
    stayCurrent: [
      { url: 'https://learn.microsoft.com/en-us/microsoftteams/whats-new', label: "What's new in Microsoft Teams" },
      { url: 'https://learn.microsoft.com/en-us/microsoftteams/teams-client-update', label: 'Teams client updates' }
    ],
    followProject: [
      { url: 'https://merill.net', label: 'merill.net' },
      { url: 'https://github.com/merill', label: 'GitHub' }
    ]
  },

  taxonomy: {
    products: [
      { slug: 'teams', name: 'Microsoft Teams', short: 'Teams', learn: 'https://learn.microsoft.com/en-us/microsoftteams/', icon: { sourceName: 'Microsoft Teams', sourcePath: 'apps/Microsoft Teams.svg', match: 'exact' } },
      { slug: 'teams-phone', name: 'Teams Phone and calling', short: 'Teams Phone', learn: 'https://learn.microsoft.com/en-us/microsoftteams/cloud-voice-landing-page', icon: teamsIcon('Call') },
      { slug: 'meetings-events', name: 'Meetings, webinars and events', short: 'Meetings and events', learn: 'https://learn.microsoft.com/en-us/microsoftteams/meetings-overview', icon: teamsIcon('Video') },
      { slug: 'teams-rooms', name: 'Microsoft Teams Rooms', short: 'Teams Rooms', learn: 'https://learn.microsoft.com/en-us/microsoftteams/rooms/', icon: teamsIcon('Building People') },
      { slug: 'devices', name: 'Teams devices and phones', short: 'Devices', learn: 'https://learn.microsoft.com/en-us/microsoftteams/devices/teams-ip-phones', icon: teamsIcon('Phone Desktop') },
      { slug: 'chat-channels', name: 'Chat, teams and channels', short: 'Chat and channels', learn: 'https://learn.microsoft.com/en-us/microsoftteams/teams-channels-overview', icon: teamsIcon('Chat Multiple') },
      { slug: 'apps', name: 'Teams apps', short: 'Apps', learn: 'https://learn.microsoft.com/en-us/microsoftteams/manage-apps', icon: teamsIcon('Apps') },
      { slug: 'clients', name: 'Teams clients and VDI', short: 'Clients', learn: 'https://learn.microsoft.com/en-us/microsoftteams/get-clients', icon: teamsIcon('Laptop') },
      { slug: 'call-quality', name: 'Call quality and networking', short: 'Call quality', learn: 'https://learn.microsoft.com/en-us/microsoftteams/quality-of-service', icon: teamsIcon('Top Speed') },
      { slug: 'analytics-reports', name: 'Analytics and reports', short: 'Analytics', learn: 'https://learn.microsoft.com/en-us/microsoftteams/teams-analytics-and-reports/teams-reporting-reference', icon: teamsIcon('Data Bar Vertical') },
      { slug: 'security-compliance', name: 'Security, privacy and compliance', short: 'Security and compliance', learn: 'https://learn.microsoft.com/en-us/microsoftteams/security-compliance-overview', icon: teamsIcon('Lock Shield') },
      { slug: 'external-access', name: 'External and guest access', short: 'External access', learn: 'https://learn.microsoft.com/en-us/microsoftteams/communicate-with-users-from-other-organizations', icon: teamsIcon('Globe') },
      { slug: 'upgrade', name: 'Migrations and the Skype for Business upgrade', short: 'Migration', learn: 'https://learn.microsoft.com/en-us/microsoftteams/upgrade-start-here', icon: teamsIcon('Arrow Sync') },
      { slug: 'education', name: 'Teams for Education', short: 'Education', learn: 'https://learn.microsoft.com/en-us/microsoftteams/expand-teams-across-your-org/teams-for-education-landing-page', icon: teamsIcon('Hat Graduation') },
      { slug: 'frontline', name: 'Frontline workers', short: 'Frontline', learn: 'https://learn.microsoft.com/en-us/microsoft-365/frontline/', icon: teamsIcon('Shifts Activity') }
    ],
    defaultProduct: 'teams',

    topics: [
      { slug: 'policies', name: 'Policies and settings', icon: teamsIcon('Settings') },
      { slug: 'ai', name: 'AI and Copilot', icon: teamsIcon('Bot') },
      { slug: 'reporting', name: 'Reports, alerts and monitoring', icon: teamsIcon('Data Trending') },
      { slug: 'architecture', name: 'Planning and deployment', icon: teamsIcon('Map') },
      { slug: 'licensing', name: 'Licensing', icon: teamsIcon('Receipt') },
      { slug: 'government', name: 'Government clouds', icon: teamsIcon('Building') },
      { slug: 'troubleshooting', name: 'Troubleshooting', icon: teamsIcon('Wrench') },
      { slug: 'developer', name: 'PowerShell and automation', icon: teamsIcon('Code') },
      { slug: 'fundamentals', name: 'Fundamentals', icon: teamsIcon('Lightbulb') },
      { slug: 'general', name: 'General', icon: teamsIcon('Question Circle') }
    ],
    defaultTopic: 'general',

    iconSource: { repository: ICONS, revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c' },

    stopwords: 'microsoft teams documentation docs update updated updates change changes new for with from into about that this your their has have will are and the how use using overview configure configuration guide learn support service services preview admin',

    searchAliases: {
      mtr: 'teams rooms',
      aa: 'auto attendant',
      cq: 'call queue',
      cqd: 'call quality dashboard',
      qos: 'quality of service',
      pstn: 'public switched telephone network',
      sbc: 'session border controller',
      vdi: 'virtual desktop infrastructure',
      sfb: 'skype for business',
      lbr: 'location-based routing'
    }
  },

  // First match wins, over "<path> <title> <body>" lowercased, so a pattern
  // anchored with `^teams\/` reads the path. Folders settle a page first; then
  // file names, narrowest first: phones/ before the phone-system names,
  // teams-rooms names before generic meeting names.
  classify: {
    products: [
      { slug: 'teams-rooms', match: /^teams\/(rooms\/|\S*(teams-rooms|-mtr-|mtr-|rooms-))/ },
      { slug: 'devices', match: /^teams\/(devices\/|phones\/|\S*(teams-ip-phones|-devices?\b|devices?-|headset|displays|panels|walkie-talkie))/ },
      { slug: 'frontline', match: /^teams\/\S*(flw|frontline|shifts|walkie|virtual-appointments|bookings)/ },
      { slug: 'education', match: /^teams\/\S*(edu|education|class-|school|moodle|classwork|assignments|reading-progress|reflect|institution-settings)/ },
      { slug: 'analytics-reports', match: /^teams\/(teams-analytics-and-reports\/|alerts\/|\S*(usage-report|analytics-and-reports|-reports?\b|reporting|collaboration-analytics|best-practice-dashboard|premium-dashboard))/ },
      { slug: 'call-quality', match: /^teams\/\S*(cqd|qos|call-analytics|call-quality|quality-of-service|quality-of-experience|network|bandwidth|media-bypass|monitor-call|connectivity)/ },
      { slug: 'upgrade', match: /^teams\/\S*(upgrade|skype|interop|coexist|sfb|migrat|slack|kaizala|teams-only-mode)/ },
      { slug: 'teams-phone', match: /^teams\/(phone-number-calling-plans\/|\S*(aa-cq|auto-attendant|call-queue|direct-routing|operator-connect|calling|phone|voice|dial|pstn|emergency|voicemail|sms|caller|call-park|location-based|sip|survivable|e911|teams-phone|business-voice|call-|-call\b|calls\b|number|toll|sbc|contact-center|ivr|music-on-hold|multi-line|virtual-user|communications-credits|communication-credits|ip-relay|real-time-text))/ },
      { slug: 'meetings-events', match: /^teams\/(teams-live-events\/|\S*(meeting|audio-conferencing|webinar|town-hall|live-event|recording|transcri|stream|lobby|breakout|events?\b|-events|interpret|presenter|whiteboard|together-mode|captions|encoder|vod-publishing|attendee-capacity|1080p|immersive|qna|bridge-settings|name-pronunciation))/ },
      { slug: 'external-access', match: /^teams\/\S*(guest|external|federat|b2b|cross-cloud|trusted-organizations|communicate-with-users)/ },
      { slug: 'security-compliance', match: /^teams\/(privacy\/|\S*(security|compliance|retention|ediscovery|information-barrier|sensitivity|dlp|encryption|privacy|data-residency|location-of-data|safe-links|audit|sensitive-content|malicious-url|weaponizable|applocker|trust-indicators|sentinel|export-teams-content|org-trust))/ },
      { slug: 'apps', match: /^teams\/\S*(app-|apps\b|apps-|-app\b|bots?\b|teams-store|custom-app|line-of-business|manage-apps|platform|approval|adobe-acrobat|connectors|plugins|google-workspace|add-in|collaboration-integration)/ },
      { slug: 'clients', match: /^teams\/\S*(client|vdi|desktop|mobile|teams-web|web-client|get-clients|new-teams|install|msix|linux|\bmac|sign-in|sign-out|browser-logs|log-files|on-rds|enhanced-teams-experience)/ },
      { slug: 'chat-channels', match: /^teams\/\S*(chat|channel|messag|archive-a-team|create-a-team|teams-overview-|team-owner|org-wide|private-|shared-|manage-teams|teams-templates|templates|dynamic-membership|delete-a-team|tag|manager-directs|template|team-expiration|custom-emojis|team-hierarchy|office-365-groups|teams-lifecycle|teams-governance|large-groups)/ }
    ],
    topics: [
      { slug: 'troubleshooting', scope: 'title', match: /\b(troubleshoot|known issue|error|faq|frequently asked)\w*/ },
      { slug: 'ai', scope: 'title', match: /\b(copilot|ai|agent|agents|intelligent|facilitator)\b/ },
      { slug: 'government', scope: 'title', match: /\b(gcc|dod|government|sovereign|21vianet)\b/ },
      { slug: 'developer', scope: 'title', match: /\b(powershell|cmdlet|graph|api|script)\w*/ },
      { slug: 'licensing', scope: 'title', match: /\b(licens|premium|add-on|pricing)\w*/ },
      { slug: 'architecture', scope: 'title', match: /\b(deploy|plan|migrat|get started|set up|prerequisit|rollout|adoption|prepare)\w*/ },
      { slug: 'reporting', scope: 'title', match: /\b(alert|report|analytics|dashboard|monitor)\w*/ },
      { slug: 'policies', scope: 'title', match: /\b(polic|setting)\w*/ },
      { slug: 'fundamentals', scope: 'title', match: /\b(overview|what is|learn about|introduction|concepts?)\b/ }
    ]
  },

  copy: {
    rssFeedLabel: 'Subscribe to the Daily Teams News RSS feed',
    messageCenterHeading: 'Teams in Message Center',
    landing: {
      heading: 'Today in Microsoft Teams',
      blurb: 'Every tracked change across Microsoft Teams admin documentation, in plain English.'
    },
    directory: {
      productsLede: 'Every part of Microsoft Teams tracked here, from calling and Teams Rooms to apps, with what changed in each.',
      topicsLede: 'Cross-cutting themes, from policies and AI to planning and government clouds.'
    },
    search: {
      inputLabel: 'Search Teams changes',
      placeholder: 'Search Microsoft Teams documentation changes'
    },
    compare: {
      pageTitle: 'Compare Teams documentation revisions',
      lede: 'Paste a Microsoft Learn URL to see exactly what changed between two revisions.',
      placeholderUrl: 'https://learn.microsoft.com/en-us/microsoftteams/teams-overview',
      mapping: 'Teams admin pages map to merill/teams-docs-mirror, rebuilt from Microsoft Learn.'
    },
    dailyEmail: {
      eyebrow: 'Daily Teams News',
      intro: 'A short daily summary of what changed across Microsoft Teams admin documentation.'
    },
    detail: {
      adminHeading: 'What Teams admins need to know',
      adminImpactLabel: 'For Teams administrators',
      summaryLabel: 'Change summary',
      summaryDisclosure: 'Summaries are generated from the documentation change itself.'
    },
    footer: {
      featureBlurb: 'Maester Cloud continuously tests your Microsoft 365 and Teams security configuration.',
      tagline: 'Daily.Teams.Admin.News: an independent record of Microsoft Teams documentation changes.'
    },
    about: {
      heading: 'About Daily.Teams.Admin.News',
      lede: 'A readable daily record of what Microsoft changed across the Teams admin documentation.',
      whyItExists: [
        'Microsoft Teams spans chat, meetings, calling, devices and apps, and its admin documentation changes constantly. Most changes are never announced anywhere.',
        'The Teams admin documentation source is not public, so there is no commit history to read. This site rebuilds one from Microsoft Learn and writes down what changed.'
      ],
      howItWorks: [
        'Four times a day merill/teams-docs-mirror fetches every Teams admin page on Microsoft Learn and commits the ones that changed.',
        'Every six hours this site reads that history. Each change is summarised, classified by area and theme, and published with a link to the exact revision that produced it.',
        'Nothing here is official. It is a reading of the public documentation.'
      ],
      emailEyebrow: 'Daily Teams News',
      emailBody: 'A short daily summary of what changed across Microsoft Teams admin documentation.',
      extraSections: [],
      community: [
        'Built by Merill Fernando as part of the Admin.News network of daily and weekly Microsoft admin editions.'
      ],
      quote: 'The documentation changes every day. Somebody should be reading it.',
      bio: 'Merill Fernando builds tools for Microsoft 365 administrators.'
    }
  }
};

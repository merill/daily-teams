// Daily Teams News against the engine's shared product checks, plus what is
// particular to Teams: the Teams/ folder publishes as microsoftteams/, and most
// pages sit flat in it, so products come from folders and file names.
const path = require('node:path');
const { defineProductConformance } = require('@merill/dailynews-engine/product-conformance');

defineProductConformance({
  root: path.join(__dirname, '..'),
  // Names this product must not carry, from files copied out of its siblings.
  // Teams pages legitimately name Exchange, SharePoint, Entra, Intune and
  // Purview, so only names that can only be a leftover are listed.
  foreignNames: /\b(memdocs|autopilot|daily\.(entra|intune|defender|purview)|purview-docs|defender-docs|windowsserverdocs)\b/i,
  mirrorState: 'teams-docs/.learn-mirror/state.json',
  trackedSamples: ['Teams/teams-overview.md', 'Teams/rooms/index.md'],
  routeCases: {
    'Teams/teams-overview.md': 'microsoftteams/teams-overview',
    'Teams/Teams-overview.md': 'microsoftteams/Teams-overview',
    'Teams/rooms/rooms-lifecycle-support.md': 'microsoftteams/rooms/rooms-lifecycle-support',
    'Teams/devices/teams-ip-phones.md': 'microsoftteams/devices/teams-ip-phones'
  },
  productCases: {
    'teams/rooms/rooms-lifecycle-support.md': 'teams-rooms',
    'teams/devices/teams-ip-phones.md': 'devices',
    'teams/phones/set-up-common-area-phones.md': 'devices',
    'teams/aa-cq-cqd-historical-reports.md': 'analytics-reports',
    'teams/create-a-phone-system-auto-attendant.md': 'teams-phone',
    'teams/direct-routing-configure.md': 'teams-phone',
    'teams/meeting-policies-overview.md': 'meetings-events',
    'teams/teams-live-events/what-are-teams-live-events.md': 'meetings-events',
    'teams/cqd-what-is-call-quality-dashboard.md': 'call-quality',
    'teams/upgrade-to-teams-on-prem-overview.md': 'upgrade',
    'teams/privacy/privacy-overview.md': 'security-compliance',
    'teams/manage-external-access.md': 'external-access',
    'teams/manage-apps.md': 'apps',
    'teams/teams-client-vdi-requirements-deploy.md': 'clients',
    'teams/private-channels.md': 'chat-channels',
    'teams/teams-analytics-and-reports/teams-reporting-reference.md': 'analytics-reports',
    'teams/using-admin-roles.md': 'teams'
  }
});

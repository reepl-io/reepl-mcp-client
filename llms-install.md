# Reepl MCP Client - Installation Guide for AI Agents

This guide helps AI assistants like Claude install and configure the Reepl MCP client.

## Prerequisites Check

Before installation, verify:
1. Claude Desktop is installed
2. User has a Reepl account (if not, direct them to https://app.reepl.io/signup)
3. Node.js 18+ is available (check with `node --version`)

## Installation Steps

### Step 1: Get the Reepl MCP Token

Direct the user to visit: https://app.reepl.io/mcp-setup

They need to:
1. Log in to their Reepl account
2. Copy the MCP token shown on the page
3. Keep this token private and secure

### Step 2: Locate Claude Desktop Config

The configuration file location depends on the OS:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Step 3: Edit the Configuration

The config file should be valid JSON. If it doesn't exist or is empty, create it with:

```json
{
  "mcpServers": {
    "reepl": {
      "command": "npx",
      "args": [
        "-y",
        "reepl-mcp-client",
        "USER_TOKEN_HERE"
      ]
    }
  }
}
```

If the file already exists with other MCP servers, add the `"reepl"` entry to the existing `"mcpServers"` object:

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "...",
      "args": ["..."]
    },
    "reepl": {
      "command": "npx",
      "args": [
        "-y",
        "reepl-mcp-client",
        "USER_TOKEN_HERE"
      ]
    }
  }
}
```

**Important**: Replace `USER_TOKEN_HERE` with the actual token from Step 1.

### Step 4: Restart Claude Desktop

The user must **completely quit** Claude Desktop (not just close the window) and restart it for changes to take effect.

**macOS**: Cmd+Q to quit
**Windows**: Right-click taskbar icon → Quit
**Linux**: File → Quit

### Step 5: Verify Installation

After restart, test the installation by asking:
- "Show me my Reepl drafts"
- "What Reepl tools do you have access to?"

If you can access the tools and retrieve data, installation is successful.

## Common Installation Issues

### Issue: "API key required" error

**Cause**: Token not properly configured in args array
**Solution**: Ensure the token is the third item in the args array (after `-y` and `reepl-mcp-client`)

### Issue: Claude doesn't see Reepl tools after restart

**Possible causes**:
1. Config file has JSON syntax errors (missing comma, quote, bracket)
2. Claude Desktop wasn't fully restarted (use Quit, not just close window)
3. Config file is in the wrong location

**Solution**:
1. Validate JSON syntax using a JSON validator
2. Ensure proper quit and restart
3. Double-check file path for the OS

### Issue: "Failed to connect to Reepl server"

**Possible causes**:
1. No internet connection
2. Reepl servers are down
3. Token is invalid or expired

**Solution**:
1. Check internet connectivity
2. Get a fresh token from https://app.reepl.io/mcp-setup
3. Verify the token is copied correctly without extra spaces

### Issue: Tools work but return empty data

**Possible causes**:
1. User hasn't created any drafts/contacts in Reepl yet
2. LinkedIn account not connected in Reepl
3. Token belongs to a different Reepl account

**Solution**:
1. Verify user is logged into correct Reepl account
2. Check that LinkedIn is connected in Reepl settings
3. Create some test drafts in Reepl web app to verify

## Post-Installation Setup

After successful installation, guide the user to:

1. **Connect LinkedIn** (if not already connected):
   - Visit https://app.reepl.io/settings/integrations
   - Connect their LinkedIn account

2. **Create test content**:
   - Use the MCP tools to create a draft: "Create a draft LinkedIn post about AI"
   - Verify the draft appears in Reepl web app

3. **Explore capabilities**:
   - Try scheduling a post
   - Access saved contacts
   - View collections and templates

## Security Notes

- The MCP token is a secure credential - never share it publicly
- Users can revoke and regenerate tokens at https://app.reepl.io/mcp-setup
- The client only forwards requests to Reepl servers - no local data storage
- All communication uses HTTPS encryption

## Getting Help

If installation issues persist:
- Email: support@reepl.io
- Documentation: https://docs.reepl.io
- GitHub Issues: https://github.com/reepl-io/reepl-mcp-client/issues

## Tool Capabilities

Once installed, you'll have access to these tools:

**Draft Management**: create_draft, get_drafts, update_draft, delete_draft
**Publishing & Scheduling**: publish_to_linkedin, schedule_post, update_scheduled_post, get_published_posts, get_scheduled_posts, delete_scheduled_post, publish_now, schedule_draft
**LinkedIn Engagement**: read_linkedin_post, add_comment_to_post
**User Data**: get_user_profile
**Voice & Writing Style**: get_voice_profile, update_voice_profile, get_writing_style, train_writing_style
**Workspace & Team**: list_workspaces, set_default_workspace, get_workspace_context, get_audience_profiles, list_workspace_members, get_workspace_posts
**Contacts**: get_contacts, get_lists, get_list_contacts, add_contact_to_list
**Content**: get_collections, get_saved_posts, get_templates
**Carousels**: generate_carousel_content, list_carousel_drafts, get_carousel_draft, create_carousel_draft, update_carousel_draft, delete_carousel_draft, list_carousel_templates
**Image Generation**: generate_image, check_image_generation_status (generation is asynchronous: start with generate_image, then poll check_image_generation_status for the URL)
**Twitter/X**: twitter_create_post, twitter_get_posts, twitter_get_drafts, twitter_create_draft, twitter_update_draft, twitter_delete_draft, twitter_update_post, twitter_delete_post, twitter_get_analytics
**Reddit**: search_reddit, get_reddit_thread_comments, reply_to_reddit
**Analytics**: get_post_analytics, get_linkedin_analytics
**Ideas & Signals**: get_ideas, generate_ideas, get_signals_inbox
**Feedback**: submit_feedback

A `carousel_guidelines` prompt is also exposed. Load it at the start of a carousel session so generated slides fit Reepl's format.

Use these to help users create, schedule, and manage LinkedIn, Twitter/X, and Reddit content, carousels, and more through natural conversation.

Full documentation: https://help.reepl.io/integrations/mcp
Tool reference: https://help.reepl.io/guides/mcp-connectors

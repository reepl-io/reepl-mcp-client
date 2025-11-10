# Reepl MCP Client

Connect your [Reepl](https://reepl.io) account to Claude Desktop and bring AI-powered LinkedIn management directly into your Claude conversations.

## What is Reepl?

[Reepl](https://reepl.io) is an AI-powered LinkedIn automation platform that helps professionals create engaging content, manage their LinkedIn presence, and grow their network.

**Key Features:**
- 🤖 **AI Writing Assistant** - Generate engaging LinkedIn posts with AI
- 📝 **Draft Management** - Save, organize, and refine your content ideas
- 📅 **Post Scheduling** - Schedule posts for optimal engagement times
- 👥 **Contact Management** - Track and organize your LinkedIn connections
- 📊 **Analytics** - Monitor post performance and engagement
- 🎨 **Content Collections** - Save inspiration and build content libraries
- 🔌 **Chrome Extension** - Write posts directly on LinkedIn with AI assistance

[Sign up for free →](https://app.reepl.io/signup)

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol that lets AI assistants like Claude interact with external tools and data sources. This MCP client connects Claude Desktop to your Reepl account, enabling Claude to:

- Create and manage LinkedIn post drafts
- Publish and schedule posts to LinkedIn
- Access your saved contacts, lists, and collections
- Retrieve your post templates and ideas
- Interact with all your Reepl data through natural conversation

## How It Works

This MCP client acts as a secure bridge between Claude Desktop and your Reepl account:

1. **You chat with Claude** - Ask Claude to help with LinkedIn content
2. **Claude uses Reepl tools** - Behind the scenes, Claude calls the Reepl MCP tools
3. **Tools connect to Reepl** - The client forwards requests to Reepl's API using your secure token
4. **Results come back to Claude** - Claude receives the data and responds to you

**Example workflow:**
- You: "Create a LinkedIn post about AI in healthcare"
- Claude generates the post and saves it as a draft in your Reepl account
- You: "Schedule it for tomorrow at 9 AM"
- Claude schedules the post through Reepl's scheduling system

## Quick Setup

### Prerequisites

- [Claude Desktop](https://claude.ai/download) installed
- A [Reepl account](https://app.reepl.io/signup) (free or paid)
- Node.js 18+ (for npx)

### Installation Steps

**1. Get your Reepl MCP token**

Visit [app.reepl.io/mcp-setup](https://app.reepl.io/mcp-setup) and copy your unique MCP token.

**2. Configure Claude Desktop**

Edit your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add the Reepl MCP server configuration:

```json
{
  "mcpServers": {
    "reepl": {
      "command": "npx",
      "args": [
        "-y",
        "reepl-mcp-client",
        "YOUR_TOKEN_HERE"
      ]
    }
  }
}
```

Replace `YOUR_TOKEN_HERE` with your actual token from step 1.

**3. Restart Claude Desktop**

Completely quit and restart Claude Desktop for the changes to take effect.

**4. Verify the connection**

Open a new conversation in Claude and try:
- "Show me my Reepl drafts"
- "What tools do you have from Reepl?"

If Claude can respond with your drafts or list the Reepl tools, you're all set! 🎉

## Available Tools

Once connected, Claude has access to these Reepl tools:

### 📝 Draft Management

**`create_draft`** - Create a new LinkedIn post draft
- Saves content ideas without publishing
- Organize your content pipeline
- Example: *"Create a draft post about the future of AI"*

**`get_drafts`** - Retrieve your saved drafts
- Search by content or filter by date
- Limit results for focused review
- Example: *"Show me my last 5 drafts about marketing"*

**`update_draft`** - Edit an existing draft
- Refine content before publishing
- Update based on feedback
- Example: *"Update my AI draft to include recent ChatGPT news"*

**`delete_draft`** - Remove unwanted drafts
- Clean up your draft library
- Remove outdated content
- Example: *"Delete the draft about last month's event"*

### 📤 Publishing & Scheduling

**`publish_to_linkedin`** - Post directly to LinkedIn
- Publish immediately to your LinkedIn feed
- Supports media URLs (images, videos)
- Control visibility (PUBLIC, CONNECTIONS_ONLY)
- Example: *"Publish this post to LinkedIn right now"*

**`schedule_post`** - Schedule for later
- Set specific date and time
- Automatically rounds to 15-minute intervals
- Manage your content calendar
- Example: *"Schedule this for tomorrow at 9 AM"*

**`update_scheduled_post`** - Edit scheduled posts
- Change content, time, or visibility
- Adapt to breaking news or feedback
- Example: *"Move my scheduled post to 2 PM instead"*

**`get_published_posts`** - View posting history
- See your recent LinkedIn posts
- Review performance
- Example: *"Show me my last 10 published posts"*

### 👤 User Profile

**`get_user_profile`** - Access your Reepl profile
- View account details
- Check subscription status
- Monitor usage and credits
- Example: *"What's my Reepl account status?"*

### 👥 Contacts & Lists

**`get_contacts`** - Retrieve saved contacts
- Access your LinkedIn network data
- Search contacts by name or company
- Build targeted outreach lists
- Example: *"Show me contacts who work at tech companies"*

**`get_lists`** - View contact lists
- Organize contacts by category
- Manage segmented groups
- Example: *"What contact lists do I have?"*

### 📚 Collections & Templates

**`get_collections`** - Access content collections
- View organized post libraries
- Browse saved inspiration
- Example: *"Show me my content collections"*

**`get_saved_posts`** - Retrieve posts from a collection
- Get inspiration from saved posts
- Reference successful content
- Example: *"Show me posts from my 'AI Insights' collection"*

**`get_templates`** - Access post templates
- Use proven content frameworks
- Speed up content creation
- Example: *"Show me my LinkedIn post templates"*

## Example Use Cases

### Content Creation Workflow
```
You: "Help me write a LinkedIn post about the impact of AI on customer service"
Claude: [Generates post and saves as draft]

You: "Make it more conversational and add a call-to-action"
Claude: [Updates the draft]

You: "Schedule it for Thursday at 10 AM"
Claude: [Schedules the post]
```

### Content Planning
```
You: "Show me my drafts from last week"
Claude: [Retrieves drafts]

You: "Which ones are about AI? Polish the best one and schedule it for tomorrow"
Claude: [Filters, refines, and schedules]
```

### Network Management
```
You: "How many contacts do I have in my 'Potential Clients' list?"
Claude: [Retrieves and counts contacts]

You: "Create a personalized outreach post targeting that audience"
Claude: [Generates targeted content]
```

## Getting Started with Reepl

New to Reepl? Here's how to get the most value:

1. **Sign up** at [app.reepl.io/signup](https://app.reepl.io/signup)
2. **Install the Chrome extension** from the [Chrome Web Store](https://chromewebstore.google.com/detail/reepl-ai-linkedin-post-wr/dkfmadebibibgfogainfmieipbgffomp)
3. **Connect your LinkedIn** account in Reepl settings
4. **Set up MCP** following the instructions above
5. **Start creating** - Use Claude to generate, schedule, and manage LinkedIn content

## Troubleshooting

### Claude doesn't see the Reepl tools

- Verify the config file is valid JSON (use a JSON validator)
- Ensure you completely quit and restarted Claude Desktop (not just closed the window)
- Check that your token is correct and hasn't expired
- Try running `npx reepl-mcp-client YOUR_TOKEN` in terminal to test connectivity

### "API key required" error

- Make sure you included your token in the `args` array in the config
- The token should be the third item in the args array (after `-y` and `reepl-mcp-client`)
- Get a fresh token from [app.reepl.io/mcp-setup](https://app.reepl.io/mcp-setup)

### "Failed to connect" errors

- Check your internet connection
- Verify Reepl's status at [status.reepl.io](https://reepl.io) (if available)
- Ensure Node.js 18+ is installed: `node --version`

### Tools work but data is empty

- Make sure you're logged into your Reepl account at [app.reepl.io](https://app.reepl.io)
- Verify you have drafts/contacts/collections created in Reepl
- Check that your LinkedIn account is connected in Reepl settings

## Resources

- 🌐 **Website**: [reepl.io](https://reepl.io)
- 📱 **Web App**: [app.reepl.io](https://app.reepl.io)
- 🔌 **Chrome Extension**: [Chrome Web Store](https://chromewebstore.google.com/detail/reepl-ai-linkedin-post-wr/dkfmadebibibgfogainfmieipbgffomp)
- 🔧 **MCP Setup**: [app.reepl.io/mcp-setup](https://app.reepl.io/mcp-setup)
- 📚 **Documentation**: [docs.reepl.io](https://docs.reepl.io)
- 💬 **Support**: support@reepl.io

## Privacy & Security

- Your MCP token is a secure credential - keep it private
- The client only forwards your requests to Reepl's servers
- No data is stored locally by the MCP client
- All communication is encrypted over HTTPS
- You can revoke your token anytime at [app.reepl.io/mcp-setup](https://app.reepl.io/mcp-setup)

## Contributing

Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/reepl-io/reepl-mcp-client/issues).

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Reepl team** | [reepl.io](https://reepl.io)

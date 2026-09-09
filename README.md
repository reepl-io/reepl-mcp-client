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

**`get_scheduled_posts`** - View posts queued for future publishing
- Shows every workspace member's scheduled posts on team plans, just your own if solo
- Filter to one teammate with a `member_user_id` from `list_workspace_members`
- Example: *"What do I have scheduled for this week?"*

**`delete_scheduled_post`** - Cancel a scheduled or failed post
- Works on posts with status scheduled, failed, or pending_approval
- Published posts can't be removed this way
- Example: *"Cancel the post I scheduled about the product launch"*

**`publish_now`** - Publish a scheduled post immediately
- Reschedules a queued post to publish within a few minutes
- Only works on posts that are still scheduled
- Example: *"Publish my scheduled AI post right now instead of waiting"*

**`schedule_draft`** - Turn a saved draft into a scheduled post
- Fetches the draft's content and creates a new scheduled post from it
- The original draft stays untouched
- Example: *"Schedule my AI draft for tomorrow at 9 AM"*

### 💬 LinkedIn Engagement

**`read_linkedin_post`** - Read any public LinkedIn post by URL
- Pulls author, post text, and like/comment counts — works on any public post, not just yours
- Returns a `urn` you can pass to `add_comment_to_post` to reply to it
- Example: *"Summarize this LinkedIn post: [url]"*

**`add_comment_to_post`** - Comment on a LinkedIn post
- Works on your own published posts or any public post (via the `urn` from `read_linkedin_post`)
- Posts under your real LinkedIn identity — always confirm the comment text before it's sent
- Example: *"Draft a thoughtful reply to this post and show it to me before posting"*

### 👤 User Profile

**`get_user_profile`** - Access your Reepl profile
- View account details
- Check subscription status
- Monitor usage and credits
- Example: *"What's my Reepl account status?"*

### 🎙️ Voice & Writing Style

**`get_voice_profile`** - View your learned writing voice
- Patterns learned from your published posts: hook styles, tone, vocabulary preferences
- Includes your own manual instructions plus positioning (audience, angle, storytelling style)
- Example: *"What does my voice profile currently say about my tone?"*

**`update_voice_profile`** - Refine your voice profile
- Update your own instructions, or the AI-learned patterns (if you haven't locked auto-updates)
- Used after analyzing your published posts to keep the profile current
- Example: *"Update my voice profile based on my last 10 posts"*

**`get_writing_style`** - View trained per-surface writing styles
- Separate style summaries for LinkedIn posts, comments, and messages
- More specific than the voice profile, which is a single overall profile
- Example: *"What's my trained writing style for comments?"*

**`train_writing_style`** - Retrain a writing-style facet from your content
- Synthesizes your actual posts (needs 20+) or comments (needs 10+) into a style summary
- Costs credits, requires Pro+, and overwrites the previous synthesis — confirm before calling
- Example: *"Retrain my writing style from my recent posts"*

### 🏢 Workspace & Team

**`list_workspaces`** - See which Reepl workspaces you belong to
- Shows your role in each and which one is your default
- Most users have just one personal workspace
- Example: *"What workspaces do I have access to?"*

**`set_default_workspace`** - Switch your active workspace
- All tools act in this workspace by default afterward, including credit usage on team plans
- Example: *"Switch me to the Acme Corp workspace"*

**`get_workspace_context`** - Read the workspace's brand context
- Company name, one-liner, industry, products, and content pillars, plus your personal role/bio in that workspace
- This is the positioning Reepl's AI uses to personalize content — good to read before writing
- Example: *"Pull up our brand context before drafting this post"*

**`get_audience_profiles`** - View the workspace's saved target audiences
- Each profile defines job titles, industries, locations, pain points, and goals
- Example: *"Who are our saved ICPs for this workspace?"*

**`list_workspace_members`** - List everyone in a workspace
- Includes each member's role, status, and LinkedIn connection state
- Pass a member's `user_id` to `get_scheduled_posts`/`get_published_posts` to see their posts
- Example: *"Who's on our team workspace and are they connected to LinkedIn?"*

**`get_workspace_posts`** - View posts across the whole team at once
- Every status (scheduled and published), annotated with each post's author
- Example: *"Show me everything the team has posted or scheduled this month"*

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

**`get_list_contacts`** - View contacts in a specific list
- Use `get_lists` first to find the list ID
- Example: *"Show me everyone in my 'Warm Leads' list"*

**`add_contact_to_list`** - Add a contact to a list
- Use `get_contacts` and `get_lists` to find the contact and list IDs
- Example: *"Add this contact to my 'Warm Leads' list"*

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

### 🎨 Carousels

**`generate_carousel_content`** - AI-generate carousel slide content
- Give it a topic, article URL, or YouTube URL — get back slide headlines and body text
- Feed the result into `create_carousel_draft`
- Example: *"Generate a carousel about the 5 biggest AI trends this year"*

**`list_carousel_drafts`** - List your saved carousel drafts
- Supports search and pagination
- Example: *"Show me my saved carousels"*

**`get_carousel_draft`** - Fetch a single carousel draft
- Returns all slide content, theme, and styling by draft ID
- Example: *"Open my carousel about onboarding tips"*

**`create_carousel_draft`** - Save a new carousel draft
- Pass slides from `generate_carousel_content` or your own content
- Reuse a saved template via a `template_id` from `list_carousel_templates` to apply its theme, colors, and fonts automatically
- Example: *"Create a carousel from this content using my 'Case Study' template"*

**`update_carousel_draft`** - Edit an existing carousel draft
- Change the title, slides, theme, or font sizes — only the fields you specify are changed
- Example: *"Update slide 3 of my carousel to mention the new pricing"*

**`delete_carousel_draft`** - Permanently delete a carousel draft
- Cannot be undone
- Example: *"Delete my old product-launch carousel draft"*

**`list_carousel_templates`** - View your saved carousel templates
- Full reusable designs (theme, colors, fonts, layout) — different from post templates (`get_templates`)
- Example: *"What carousel templates do I have saved?"*

### 🖼️ Image Generation

**`generate_image`** - Start generating an AI image for a post
- Uses your linked Gemini API key
- **Asynchronous**: this starts the job and returns straight away. Poll `check_image_generation_status` until it finishes, then use the returned URL in `publish_to_linkedin` or `schedule_post`
- Always show the image for approval before publishing
- Example: *"Generate an image for this post about remote work"*

**`check_image_generation_status`** - Check whether a `generate_image` job has finished
- Returns the job's status and, once complete, the image URL
- Example: *"Is that image ready yet?"*

### 🐦 Twitter/X

**`twitter_create_post`** - Publish or schedule a Twitter/X post or thread
- Omitting `scheduledFor` publishes immediately — always confirm before publishing without a schedule
- Content must be pre-split into tweet-sized (280 char) chunks; requires Twitter connected + a paid plan
- Example: *"Schedule this thread for X tomorrow at 10 AM"*

**`twitter_get_posts`** - View your Twitter/X posts
- Filter by status: published, scheduled, or failed
- Example: *"Show me my scheduled tweets"*

**`twitter_get_drafts`** - View your Twitter/X drafts
- Example: *"What Twitter drafts do I have saved?"*

**`twitter_create_draft`** - Save a Twitter/X post as a draft
- For threads, provide the tweets array
- Example: *"Save this as a Twitter draft, don't post it yet"*

**`twitter_update_draft`** - Edit a Twitter/X draft
- Example: *"Update my Twitter draft to shorten the second tweet"*

**`twitter_delete_draft`** - Delete a Twitter/X draft
- Example: *"Delete that old Twitter draft about the conference"*

**`twitter_update_post`** - Edit a scheduled or pending Twitter/X post
- Only works on posts with status scheduled, pending_approval, changes_requested, or rejected
- Example: *"Move my scheduled tweet to 3 PM instead"*

**`twitter_delete_post`** - Delete a Twitter/X post
- Deletes from X too if already published; refunds credits if it was still scheduled
- Example: *"Delete that tweet I posted this morning"*

**`twitter_get_analytics`** - View aggregate Twitter/X analytics
- Engagement metrics and follower trends
- Example: *"How's my Twitter engagement trending?"*

### 🔴 Reddit

**`search_reddit`** - Search Reddit for relevant conversations (Premium)
- Keyword search across Reddit threads/posts, returns title, subreddit, upvotes, comment count, and a post ID
- Pass the post ID to `reply_to_reddit` to engage with it
- Example: *"Search Reddit for conversations about AI writing tools"*

**`get_reddit_thread_comments`** - Read the comments on a Reddit thread
- Use it before replying: a reply that answers the title without engaging with the discussion under it reads as spam to most subreddits
- Example: *"What are people actually saying in that thread?"*

**`reply_to_reddit`** - Reply to a Reddit thread/post
- Posts the comment immediately, or submits it for teammate approval if your workspace requires it
- Requires your Reddit account connected in Reepl settings first
- Example: *"Reply to that Reddit thread with a helpful, non-promotional answer"*

### 📊 Analytics

**`get_post_analytics`** - View engagement for one LinkedIn post
- Reactions, comments, and reposts, refreshed live when stale (impressions not available)
- Example: *"How's my post about AI trends performing?"*

**`get_linkedin_analytics`** - View aggregate LinkedIn analytics
- Total engagement and performance trends across all your posts
- Example: *"Give me an overview of my LinkedIn performance this month"*

### 💡 Ideas & Signals

**`get_ideas`** - View your content ideas board
- Ideas generated from your posts, saved posts, or connected docs (Notion, Google Docs)
- Filter by status (new/saved/used) or source
- Example: *"What content ideas do I have saved?"*

**`generate_ideas`** - AI-generate new content ideas
- Derived from your published posts, saved posts, or linked documents — costs credits
- Example: *"Generate 5 new post ideas from my recent published content"*

**`get_signals_inbox`** - View your personalized content signal feed
- Trending Reddit posts, YouTube videos, RSS articles, and topics matching your interests
- Example: *"What's trending in my signals feed today?"*

### 📢 Feedback

**`submit_feedback`** - Send feedback to Reepl
- Report bugs, request features, or share ideas without leaving your AI client
- Example: *"Tell Reepl I'd love a dark mode option"*

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

## Prompts

Alongside its tools, the server exposes one MCP **prompt**:

**`carousel_guidelines`** - Carousel content and styling rules
- Load it at the start of a carousel session so generated slides fit Reepl's format
- Example: *"Use the Reepl carousel guidelines, then draft me a 7-slide carousel on onboarding"*

## Documentation

- Setup and troubleshooting: [help.reepl.io/integrations/mcp](https://help.reepl.io/integrations/mcp)
- Full tool reference: [help.reepl.io/guides/mcp-connectors](https://help.reepl.io/guides/mcp-connectors)
- Reepl REST API (a separate surface with its own credentials): [developers.reepl.io](https://developers.reepl.io)

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

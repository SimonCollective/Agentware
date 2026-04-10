# Data Sources

The ProposalFlow pipeline pulls data from multiple sources. Each source has a **static fallback** (files in this repo) and an optional **dynamic source** (MCP connector or API).

## Source Resolution Pattern

Every agent that needs external data follows this pattern:

```
function resolve_source(source_name):
  1. Check if the MCP connector is available
  2. If yes: use the MCP tool to fetch live data
  3. If no: fall back to the static file
  4. Log which source was used in metadata.json
```

This means the system works out of the box with just the files in this repo. As MCP connectors come online, the agents automatically prefer them.

## Source Registry

| Source | Static Fallback | MCP Connector | Status |
|--------|----------------|---------------|--------|
| Products/Offerings | `system/products/*.md` | EngageOps: `list_offerings()` | Pending |
| Example Proposals | `system/examples/*.txt` | EngageOps: `list_proposals()` | Pending |
| Company Research | Web search | EngageOps: `get_company()` | Pending |
| Contact Research | Web search (LinkedIn) | EngageOps: `get_contacts()` | Pending |
| Pricing Guide | Extracted from examples | EngageOps: `get_pricing_guide()` | Pending |
| Team Members | Static in template | EngageOps: `get_team()` | Pending |
| Contract Templates | Placeholder or manual | EngageOps: `get_contract_template()` | Pending |
| Client History | Manual (transcript) | EngageOps: `get_client_history()` | Pending |
| Style Guide | `system/style/style-guide.md` | N/A (always local) | Active |
| Proposal Framework | `system/templates/framework.md` | N/A (always local) | Active |

## How to Add a New Source

1. Define the source in this README (add a row to the table)
2. Create the static fallback file in the appropriate directory
3. Document the MCP tool signature the agent should look for
4. Update the relevant agent definition with the source resolution logic
5. Test with both static and MCP paths

## EngageOps MCP Integration

When the EngageOps MCP becomes available, agents will detect it by checking for tools prefixed with `engageops_` or `engage_ops_`. The expected tool signatures are:

```
engageops_list_offerings()
  -> Returns: Array of product/service offerings with pricing

engageops_get_offering(name)
  -> Returns: Detailed product brief

engageops_list_proposals(filters?)
  -> Returns: Array of past proposals with metadata

engageops_get_company(name)
  -> Returns: Company profile and intelligence

engageops_get_contacts(company_name)
  -> Returns: Key contacts and relationship history

engageops_get_pricing_guide()
  -> Returns: Current pricing tiers and benchmarks

engageops_get_team()
  -> Returns: Available team members and bios

engageops_get_contract_template(type)
  -> Returns: Contract terms template
```

These signatures may change as EngageOps is built out. The agent definitions should be updated to match the actual tool names once the MCP is live.

## Checking MCP Availability

In Cowork / Claude Code, check for available MCP tools:

```
# In an agent context, check if engageops tools exist
# by attempting to call list_offerings or checking available tools
```

In the plugin version, the source resolution will be handled by the plugin framework's connector system.

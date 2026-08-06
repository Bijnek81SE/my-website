# Canonical Mechanism Registry

The mechanism registry separates mechanism identity and relationships from React presentation.

Each mechanism has a stable ID, reaction relationship, public feature, route, aliases, prerequisites, capabilities, and a player ID. Static route pages use a shared page shell and resolve the player through a registry.

This makes future mechanism additions localized and prevents route metadata, reaction links, and player selection from drifting apart.

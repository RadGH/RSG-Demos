# PixelLab Art Assets Reference

Generated for Milestone 29 integration. All assets are 128px characters, 32px tiles, or 400px map objects.

## Characters (128px, 8 directions, standard mode, high detail, detailed shading)

| Name | Character ID | Status |
|------|-------------|--------|
| Ironclad | c8f11dfe-39cd-4def-bd48-2d169dcd3262 | Ready |
| Riftmage | c4685303-a666-4cf7-a7e0-fe9fd5900de5 | Ready |
| Phantom | 75388cb4-d915-4cfe-ace5-0055a241ffba | Ready |
| Voidpriest | 067a2f0f-d6b6-47ea-acb3-5fb8b322493a | Ready |
| Tomb Rat | c0c73115-1620-4d8b-b802-47cc2b20971e | Ready |
| Skeleton | b2080c66-675f-4148-9383-8906f925ab6a | Ready |
| Skeleton Archer | ee3cc3b3-1573-41ef-89d1-3ac7c009929a | Ready |
| Mummy Guardian | b9ca4bf3-dff3-4526-a5fd-d28d385de513 | Ready |
| Lord of Dust | fe22c290-b606-4c20-98a1-14c02205ecaa | Ready |

## Tilesets (32x32)

| Name | Tileset ID | Type | Status |
|------|-----------|------|--------|
| Stone Crypts floor/wall | d06ccf52-ed59-4ef7-85ad-822a02cc040d | topdown | Ready |

## Tiles Pro (32px square_topdown)

| Name | Tile ID | Variations | Status |
|------|---------|-----------|--------|
| Corridor tiles | 16992cfd-025e-43ae-b0cc-40243843aedc | 4 | Ready |
| Special floors | e9580a20-66e4-40d7-b692-9617685f18a7 | 4 | Ready |

## Map Objects (400x400)

| Name | Object ID | Status |
|------|----------|--------|
| Treasure chest | 7b74af9d-478c-4c91-bc94-34261cf57529 | Ready |
| Brazier/torch | 42b96478-3ba8-4917-9df0-36271543612d | Ready |
| Shrine | 863cd34b-059c-4f36-ac3e-e4022ef4ce74 | Ready |
| Barrel | b0f8c90f-ef1e-4ad9-bb27-d09a9aef3cfd | Ready |
| Stone pillar | 0449f490-c6ce-4759-b572-9d98da80e72c | Ready |
| Merchant cart | 7f912dc9-a4a1-41ae-9cbe-cde16a9d5e18 | Ready |
| Stairs down | 5a5f4a69-f690-49c4-9b2c-c6d147b6f1c4 | Ready |
| Door | 11d7addc-8da6-4289-ba3d-39a4e7f7086b | Ready |

## Download Commands

Characters:
```bash
mkdir -p public/assets/characters
for id in c8f11dfe-39cd-4def-bd48-2d169dcd3262 c4685303-a666-4cf7-a7e0-fe9fd5900de5 75388cb4-d915-4cfe-ace5-0055a241ffba 067a2f0f-d6b6-47ea-acb3-5fb8b322493a c0c73115-1620-4d8b-b802-47cc2b20971e b2080c66-675f-4148-9383-8906f925ab6a ee3cc3b3-1573-41ef-89d1-3ac7c009929a b9ca4bf3-dff3-4526-a5fd-d28d385de513 fe22c290-b606-4c20-98a1-14c02205ecaa; do
  curl --fail -o "public/assets/characters/${id}.zip" "https://api.pixellab.ai/mcp/characters/${id}/download"
done
```

Tileset:
```bash
mkdir -p public/assets/tilesets
curl --fail -o public/assets/tilesets/stone_crypts.png "https://api.pixellab.ai/mcp/tilesets/d06ccf52-ed59-4ef7-85ad-822a02cc040d/image"
curl --fail -o public/assets/tilesets/stone_crypts.json "https://api.pixellab.ai/mcp/tilesets/d06ccf52-ed59-4ef7-85ad-822a02cc040d/metadata"
```

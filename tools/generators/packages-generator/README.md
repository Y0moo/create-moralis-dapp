# Package generator for @create-moralis-dapp monorepo

## Quick start

1. run `nx workspace-generator packages-generator`
2. Answer questions
3. Done!

## Tips

- Use `@create-moralis-dapp/toolkit` as much as possible. Instead of creating a new function consider about moving it to the `toolkit`
- All packages should contain folder `src/generators`.
- All generators should be located at `src/generators`
- The `src/generators/base` path should be used for generating basic core application.
- The generator can have "actions", example: `packages/react/src/generators/base/actions`

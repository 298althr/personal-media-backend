# PlaylistType

The type of the playlist.

## Example Usage

```typescript
import { PlaylistType } from "@lukehagar/plexjs/models/shared";

let value: PlaylistType = PlaylistType.Video;

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

| Name                   | Value                  |
| ---------------------- | ---------------------- |
| `Audio`                | audio                  |
| `Video`                | video                  |
| `Photo`                | photo                  |
| -                      | `Unrecognized<string>` |
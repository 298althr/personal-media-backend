# GetPlaylistGeneratorState

## Example Usage

```typescript
import { GetPlaylistGeneratorState } from "@lukehagar/plexjs/models/operations";

let value: GetPlaylistGeneratorState = GetPlaylistGeneratorState.Failed;

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

| Name                   | Value                  |
| ---------------------- | ---------------------- |
| `Pending`              | pending                |
| `Complete`             | complete               |
| `Failed`               | failed                 |
| -                      | `Unrecognized<string>` |
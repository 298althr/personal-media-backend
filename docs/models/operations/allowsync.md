# AllowSync

Indicates if the user is allowed to sync media.

## Example Usage

```typescript
import { AllowSync } from "@lukehagar/plexjs/models/operations";

let value: AllowSync = AllowSync.Enable;

// Open enum: unrecognized values are captured as Unrecognized<number>
```

## Values

| Name                   | Value                  |
| ---------------------- | ---------------------- |
| `Disable`              | 0                      |
| `Enable`               | 1                      |
| -                      | `Unrecognized<number>` |
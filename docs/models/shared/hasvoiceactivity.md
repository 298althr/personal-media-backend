# HasVoiceActivity

Voice activity detection availability flag returned by PMS.
PMS returns this as string values (`"0"` or `"1"`) instead of a JSON boolean.


## Example Usage

```typescript
import { HasVoiceActivity } from "@lukehagar/plexjs/models/shared";

let value: HasVoiceActivity = HasVoiceActivity.True;

// Open enum: unrecognized values are captured as Unrecognized<number>
```

## Values

| Name                   | Value                  |
| ---------------------- | ---------------------- |
| `False`                | 0                      |
| `True`                 | 1                      |
| -                      | `Unrecognized<number>` |
# MailingListStatus

Your current mailing list status

## Example Usage

```typescript
import { MailingListStatus } from "@lukehagar/plexjs/models/operations";

let value: MailingListStatus = MailingListStatus.Active;

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

| Name                   | Value                  |
| ---------------------- | ---------------------- |
| `Active`               | active                 |
| `Unsubscribed`         | unsubscribed           |
| `Removed`              | removed                |
| -                      | `Unrecognized<string>` |
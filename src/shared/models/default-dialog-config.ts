import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '600px';
  dialogConfig.height = '700px';

  return dialogConfig;
}

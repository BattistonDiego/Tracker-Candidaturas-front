import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
})
export class ConfirmationDialog {
  readonly data = inject<ConfirmationDialogData>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}

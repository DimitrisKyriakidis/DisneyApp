import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character-modal',
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CharacterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}

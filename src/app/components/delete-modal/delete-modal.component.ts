import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(private modalService: ModalService,
    private deleteService: DeleteService) { }

  ngOnInit() {
  }

  delete(status: boolean) {
    this.deleteService.newValue(status);
    this.close();
  }

  public close() {
    this.modalService.destroy();
  }

}

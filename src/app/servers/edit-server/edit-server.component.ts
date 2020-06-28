import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.server = this.serversService.getServer(id);

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.server = this.serversService.getServer(+paramMap.get('id'));
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.server.name, status: this.server.status});
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

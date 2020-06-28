import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
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

  edit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';

interface HostDataRes {
  admins: string[];
  createdAt: string;
  name: string;
  _id: string;
  description?: string;
}

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss'],
})
export class HostsComponent {
  loadingGet: boolean = false;
  loadingPost: boolean = false;
  hostForm!: FormGroup;
  userInfo!: UserInfo;
  hosts: HostDataRes[] = [];
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.userInfo = user;
    });
    this.hostForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // plane: new FormControl('not-selected', [
      //   Validators.required,
      //   Validators.pattern(/(free|advanced)/),
      // ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    // Get Latest Hosts
    this.getHosts();
  }

  async createHost(form: FormGroup) {
    // delete form.value.plane;
    console.log('Form Group', form);

    // return;
    try {
      this.loadingPost = true;
      const res = await fetch('http://localhost:4000/api/v1/host', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.userInfo.token!,
        },
        body: JSON.stringify(form.value),
      });
      console.log('responce from create Host', res);
      if (res.ok) {
        const data: { message: string; data: HostDataRes } = await res.json();
        console.log('data from create Host', data);
        // await this.getHosts();
        this.hosts.push(data.data);
        const clickEvent = new MouseEvent('click');
        document.getElementById('close-host-form')?.dispatchEvent(clickEvent);
        this.loadingPost = false;
        form.reset();

        // Get Latest Hosts
      } else {
        console.log('create Host res not ok', res);
        console.log('create Host res not ok', await res.json());
      }
    } catch (err) {
      console.log('error from create Host', err);
    }
  }

  async getHosts() {
    try {
      this.loadingGet = true;
      const res = await fetch(
        'http://localhost:4000/api/v1/host/all_user_host',
        {
          method: 'GET',
          headers: {
            Authorization: this.userInfo.token!,
          },
        }
      );
      console.log('getHosts res', res);
      if (res.ok) {
        const data: {
          data: HostDataRes[];
          message: string;
        } = await res.json();

        console.log('get Hosts res data', data);

        this.hosts.push(...data.data);

        console.log(this.hosts, 'my hosts');
      } else console.log('get Hosts res not ok', res);
    } catch (error) {
      console.log('host/all_user_host error', error);
    }
    this.loadingGet = false;
  }
}

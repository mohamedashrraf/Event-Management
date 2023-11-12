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
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    // Get Latest Hosts
    this.getHosts();
  }

  async createHost(form: FormGroup) {
    try {
      this.loadingPost = true;
      const res = await fetch(
        'https://events-app-api-faar.onrender.com/api/v1/host',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.userInfo.token!,
          },
          body: JSON.stringify(this.hostForm.value),
        }
      );
      const data: { message: string; data: HostDataRes } = await res.json();
      this.loadingPost = false;
      if (data.message === 'host created') {
        this.hosts.push(data.data);
        this.removeModal();
        form.reset();
      } else if (data.message === 'chang your plan to add more host') {
        setTimeout(() => {
          this.hostForm.setErrors({
            createdFailed: 'Upgrade your plan to create more hosting',
          });
        });
      }
    } catch (err) {
      console.log('error from create Host', err);
    }
  }

  async getHosts() {
    try {
      this.loadingGet = true;
      const res = await fetch(
        'https://events-app-api-faar.onrender.com/api/v1/host/all_user_host',
        {
          method: 'GET',
          headers: {
            Authorization: this.userInfo.token!,
          },
        }
      );
      // console.log('getHosts res', await res.json());
      if (res.ok) {
        const data: {
          data: HostDataRes[];
          message: string;
        } = await res.json();

        console.log('get Hosts res data', data);

        this.hosts.push(...data.data);

        console.log(this.hosts, 'my hosts');
      } else console.log('get Hosts res not ok', await res.json());
    } catch (error) {
      console.log('host/all_user_host error', error);
    }
    this.loadingGet = false;
  }

  removeModal() {
    const clickEvent = new MouseEvent('click');
    document.getElementById('close-host-form')?.dispatchEvent(clickEvent);
  }
}

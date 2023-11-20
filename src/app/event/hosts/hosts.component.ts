import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import HostDetails from 'src/app/shared/interfaces/host-info';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';

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
  hosts: HostDetails[] = [];

  whoiam!: Whoiam;
  constructor(private authService: AuthService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
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

  async ngOnInit() {
    const user = await this.authService.user();
    this.userInfo = user!;
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
            Authorization: this.whoiam.token!,
          },
          body: JSON.stringify(this.hostForm.value),
        }
      );
      const data: { message: string; data: HostDetails } = await res.json();
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
            Authorization: this.whoiam.token!,
          },
        }
      );
      if (res.ok) {
        const data: {
          data: HostDetails[];
          message: string;
        } = await res.json();
        this.hosts.push(...data.data);
      } else console.log('get Hosts res not ok', await res.json());
    } catch (error) {
      console.log('host/all_user_host error', error);
    }
    this.loadingGet = false;
  }

  async handleARemoveHost(e: Event, id: string) {
    e.stopPropagation();
    try {
      const res = await fetch(
        'https://events-app-api-faar.onrender.com/api/v1/host/' + id,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.whoiam.token!,
          },
        }
      );
      const data = await res.json();
      if (data.message === 'host deleted')
        this.hosts = this.hosts.filter((host) => host._id !== id);
      else if (data.message === 'You can not delete this host')
        alert(data.message);
    } catch (error) {}
  }

  removeModal() {
    const clickEvent = new MouseEvent('click');
    document.getElementById('close-host-form')?.dispatchEvent(clickEvent);
  }
}

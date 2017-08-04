import {Injectable} from '@angular/core';

@Injectable()
export class StateService {

    login(username: string): void {

        localStorage.setItem('isLogined', 'true');
        localStorage.setItem('username', username);
    }

    logout(): void {

        localStorage.setItem('isLogined', 'false');
        localStorage.setItem('username', '');
        localStorage.setItem('userInfo', '');
    }

    getUserName(): string {

        return localStorage.getItem('username');
    }

    isLogined(): boolean {

        return localStorage.getItem('isLogined') === 'true';
    }

    setUserInfo(userInfo: Object): void {

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    setLanguage(lang: string): void {

        localStorage.setItem('language', lang);
    }

    getLanguage(): string {

        return localStorage.getItem('language') || 'zh';
    }
}

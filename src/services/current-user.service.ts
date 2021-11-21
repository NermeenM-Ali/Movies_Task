import AsyncStorage from '@react-native-community/async-storage';

export class CurrentUser {
    private currentUserStorageKey = 'current~user';
    async login(currentUser: any): Promise<any> {
        return await AsyncStorage.setItem(this.currentUserStorageKey, JSON.stringify(currentUser));
    }

    async getCurrentUser(): Promise<{ userConnectionID: any, ID: number, AccessToken: string, NameArabic: string, NameEnglish: string, PicUrl: any, Status: any }> {
        return await AsyncStorage.getItem(this.currentUserStorageKey).then((currentUser: any) => JSON.parse(currentUser));
    }

    async logout(): Promise<any> {
        return await AsyncStorage.removeItem(this.currentUserStorageKey);
    }

}

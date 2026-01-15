// Auth index - redirects to SignIn
import { Redirect } from 'expo-router';

export default function AuthIndex() {
    return <Redirect href={"/(auth)/SignIn" as any} />;
}

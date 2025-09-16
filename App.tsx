import MainNavigation from './navigation/MainNavigation';
import './global.css';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
    return (
     <LanguageProvider>
       <MainNavigation />
     </LanguageProvider>
    );
}

import './App.css'
import 'downtowncore/dist/style.css';
import { Button, Avatar, AvatarFallback, AvatarImage, Alert, AlertDescription, AlertTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ThemeProvider, useTheme } from 'downtowncore';
import { Terminal, Moon, Sun } from 'lucide-react';
import { ModeToggle } from './components/ThemeToggle';

export default function App() {

  return (
    <>
    <ThemeProvider>
      <div className={`flex align-center justify-start flex-col h-[100vh]`}>
        <h1 className="text-3xl font-bold underline">
          Built using shadcn-ui-library-starter
        </h1>

        <ModeToggle />
          <Button ripple="off">Button</Button>

        <div className='py-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className='py-4'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>

        <div className='py-4'>
          <ul className='text-left'>
            <li> Feel free to add more components from ui.shadcn.com and build your own library.</li>
            <br />
            <li> Features:</li>
            <li> - Tree-shakeable (components you don't use won't be included in your bundle)</li>
            <li>- Dark mode support</li>
            <li> - Override library styles with your own using tailwindcss or your own css</li>
          </ul>
        </div>
      </div>
    </ThemeProvider>
    </>
  )
}


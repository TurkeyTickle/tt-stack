import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import FormTest from './components/test/form-test'

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex gap-2 justify-center'>
        <Button variant="secondary">Test</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Test</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                This is a test form
              </DialogTitle>
              <DialogDescription>
                <FormTest />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs>
        <TabsList>
          <TabsTrigger value="test1">Test 1</TabsTrigger>
          <TabsTrigger value="test2">Test 2</TabsTrigger>
          <TabsTrigger value="test3">Test 3</TabsTrigger>
        </TabsList>
        <TabsContent value="test1" className='animate-in slide-in-from-bottom-6 fade-in-25 duration-300 p-4'>
          <FormTest />
        </TabsContent>
        <TabsContent value="test2" className='animate-in slide-in-from-bottom-6 fade-in-25 duration-300'>This is test 2</TabsContent>
        <TabsContent value="test3" className='animate-in slide-in-from-bottom-6 fade-in-25 duration-300'>This is test 3</TabsContent>
      </Tabs>
    </ThemeProvider>
  )
}

export default App

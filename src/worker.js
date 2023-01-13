


//I use a workaround. Chrome blocks Worker but not <script>. Hence the best way to make a universal solution is this:

function worker_function() {
    self.onmessage = ({data}) => {
        const interval = data.interval;
    
        const timerFunction = () => {
            self.postMessage(true);
        }
    
        setInterval(() => {
            timerFunction();
        }, interval)
     
    }
    
}
// This is in case of normal worker start
// "window" is not defined in web worker
// so if you load this file directly using `new Worker`
// the worker code will still execute properly
if(window!=self)
  worker_function();
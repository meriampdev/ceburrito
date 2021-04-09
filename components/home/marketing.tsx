import Button from '@material-ui/core/Button';

export default function Featured() {
  return (
    <div className="marketing px-32 py-10">
      <div className="marketing-content">
        <div className="content-item grid grid-cols-2">
          <img src="/images/square.png" />
          <div className="grid grid-rows-2">
            <div className="grid grid-cols-2">
              <div className="border border-dashed flex flex-col gap-5 items-center justify-center">
                <span className="font-bold text-3xl">Catering</span>
                <Button variant="contained" color="primary">Order Now!</Button>
              </div>
              <div className="border border-dashed flex items-center justify-center">
                
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border border-dashed flex items-center justify-center"></div>
              <div className="border border-dashed flex flex-col gap-5 items-center justify-center">
                <span className="font-bold text-3xl">Barkada Order</span>
                <Button variant="contained" color="primary">Order Now!</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="content-item grid grid-cols-2">
          <div className="grid grid-rows-2">
            <div className="grid grid-cols-2">
              <div className="border border-dashed flex items-center justify-center"></div>
              <div className="border border-dashed flex flex-col gap-5 items-center justify-center">
                <span className="font-bold text-3xl">Lorem Ipsum</span>
                <Button variant="contained" color="primary">Order Now!</Button>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border border-dashed flex flex-col gap-5 items-center justify-center">
                <span className="font-bold text-3xl">Lorem Ipsum</span>
                <Button variant="contained" color="primary">Order Now!</Button>
              </div>
              <div className="border border-dashed flex items-center justify-center"></div>
            </div>
          </div>
          <img src="/images/product-design.png" />
        </div>
      </div>
    </div>
  )
}
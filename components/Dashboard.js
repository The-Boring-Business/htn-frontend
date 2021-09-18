const Dashboard = () => {
    return (
      <div className="py-6 pl-6 border-r-2 border-red w-80 h-screen">
        <div className="mb-14">
          <img className="h-7" src="/logo.svg" alt="logo" />
        </div>
  
        <div>
          <div className="flex w-60 py-2.5 px-5 mb-4 text-l rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue">
            <div className="mr-5">
              <i className="ri-line-chart-line"></i>
            </div>
            <div className="">Analytics</div>
          </div>
  
          <div className="flex flex-col text-l cursor-pointer bg-none text-gray font-semi-bold mb-4">
            <div className="flex  rounded-lg  w-60 py-2.5 px-5   hover:text-white  hover:bg-blue">
              <div className="mr-5">
                <i class="ri-book-2-line"></i>
              </div>
  
              <div className="">Learning</div>
            </div>
  
            <div className=" rounded-md  w-52 py-1 mx-10 px-4   hover:text-white  hover:bg-blue">
              Budgeting Basics
            </div>
  
            <div className=" rounded-md  w-52 py-1 mx-10 px-4   hover:text-white  hover:bg-blue">
              Investment 101
            </div>
          </div>
  
          <div className="flex flex-col text-l cursor-pointer bg-none text-gray font-semi-bold mb-4">
            <div className="flex  rounded-lg  w-60 py-2.5 px-5   hover:text-white  hover:bg-blue">
              <div className="mr-5">
                <i class="ri-wallet-line"></i>
              </div>
  
              <div className="">Budget Diary</div>
            </div>
  
            <div className="rounded-md  w-52 py-1 mx-10 px-4   hover:text-white  hover:bg-blue">
              Income
            </div>
  
            <div className="  rounded-md  w-52 py-1 mx-10 px-4   hover:text-white  hover:bg-blue">
              Expenses
            </div>
          </div>
  
          <div className="flex w-60 py-2.5 px-5 mb-4 text-l rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue">
            <div className="mr-5">
              <i class="ri-user-line"></i>
            </div>
            <div className="">Profile</div>
          </div>
        </div>
      
      
      </div>
    );
  };
  
  export default Dashboard;
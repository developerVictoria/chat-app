
const SignUp = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sing Up
                    <span className='text-indigo-300'> Chat App</span>
                </h1>
            </div>
            <form action="">
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Full Name
                        </span>
                    </label>
                    <input type="text" placeholder='Enter full name' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Username
                        </span>
                    </label>
                    <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Password
                        </span>
                    </label>
                    <input type="text" placeholder='Enter password' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Confirm password
                        </span>
                    </label>
                    <input type="text" placeholder='Enter password' className='w-full input input-bordered h-10' />
                </div>
                <a href='#' className='text-sm hover:underline hover:text-indigo-300 mt-2 inline-block'>
                    Already have an account
                </a>
                <div>
                    <button className='btn btn-block btn-sm mt-2'>Sing Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp

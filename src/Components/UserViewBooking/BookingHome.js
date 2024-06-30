import React, { Suspense } from "react";
import { UserViewBookingContextProvider } from "./UserViewBookingContext";
import { Route, Routes } from "react-router-dom";
import ViewBookingDetails from "./ViewBookingDetails";
import ViewBookingList from "./ViewBookingList";

function BookingHome() {
    const ViewBookingListLazyLoad = React.lazy(() => {
        return new Promise(resolve => {
            setTimeout(() => resolve(import('./ViewBookingList')), 1000);
        });
    });

    // return (<React.Fragment>
    //     <UserViewBookingContextProvider>
    //         <Routes>
    //             <Route index element={<ViewBookingList />}></Route>
    //             <Route path=":id" element={<ViewBookingDetails />} />
    //         </Routes>
    //     </UserViewBookingContextProvider>
    // </React.Fragment>)

    return (<React.Fragment>
        <UserViewBookingContextProvider>
            <Suspense fallback={<div>Loading...DETAILS...</div>}>
                <Routes>
                    <Route index element={<ViewBookingListLazyLoad />}></Route>
                    <Route path=":id" element={<ViewBookingDetails />} />
                </Routes>
            </Suspense>
        </UserViewBookingContextProvider>
    </React.Fragment>)
}

export default BookingHome;
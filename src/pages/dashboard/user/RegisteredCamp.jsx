import useCamps from "../../../hooks/useCamps";


const RegisteredCamp = () => {
    const [camps, loading, refetch] = useCamps()
    console.log(camps);
    return (
        <div>
            <div className="p-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Fees</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Participant Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Confirmation Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Cancel Button</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Feedback Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{item.campName}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.campFees}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.participantName}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.paymentStatus}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.confirmationStatus}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="text-red-500 hover:underline">Cancel</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.feedback !== "N/A" ? (
                                        <button className="text-blue-500 hover:underline">{item.feedback}</button>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamp;
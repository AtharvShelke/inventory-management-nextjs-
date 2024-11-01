import toast from "react-hot-toast";

export const makePostRequest = async (reset, setLoading, endpoint, message, data) => {
    try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        setLoading(false); // Move this here to ensure loading is set false regardless of response

        if (response.ok) {
            console.log(response);
            toast.success(`Successfully Added the ${message}`);
            reset();
        } else {
            const errorText = await response.text(); // Get the response text in case it's not JSON
            console.error(errorText);
            toast.error(`Error: ${errorText || 'An error occurred'}`);
        }
    } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error(`Error: ${error.message}`);
    }
    
};

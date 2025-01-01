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
            
            toast.success(`Successfully Added the ${message}`);
            reset();
        } else {
            const errorText = await response.text(); // Get the response text in case it's not JSON
            console.error(errorText);
            toast.error(`Error: ${errorText || 'An error occurred'}`);
        }
    } catch (error) {
        setLoading(false);
        
        toast.error(`Error: ${error.message}`);
    }
    
};
export const getRequest = async (endpoint) => {
    try {
        // Add a timestamp to the URL to prevent server-side caching
        const timestamp = new Date().getTime();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}?timestamp=${timestamp}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store', // Prevents browser from caching
                'Pragma': 'no-cache', // Additional caching control for older HTTP versions
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const updateRequest = async (reset, setLoading, endpoint, message, data) => {
    
    try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        setLoading(false); 

        if (response.ok) {
            
            toast.success(`Successfully Updated the ${message}`);
            reset();
        } else {
            const errorText = await response.text(); 
            console.error(errorText);
            toast.error(`Error: ${errorText || 'An error occurred'}`);
        }
    } catch (error) {
        setLoading(false);
        
        toast.error(`Error: ${error.message}`);
    }
    
};

export const deleteRequest = async ( endpoint, message) => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
  
       // Ensure loading state is reset regardless of response status
  
      if (response.ok) {
        toast.success(`Successfully Deleted the ${message}`);
      } else {
        const errorText = await response.text(); // Get the response text in case it's not JSON
        console.error(errorText);
        toast.error(`Error: ${errorText || 'An error occurred'}`);
      }
    } catch (error) {
      
      toast.error(`Error: ${error.message}`);
    }
  };


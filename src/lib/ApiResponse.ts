
const handleApiResponse = async (response: Response) =>{
    if(!response.ok){
        let errorMsg = `Request failed with status ${response.status}: ${response.statusText}`;

        try {
            const contentType = response.headers.get('content-type');
            if(contentType && contentType.includes('application/json')){
                const errorData = await response.json();
                errorMsg = errorData.message || errorData.error || errorMsg;
            }else{
                const errorText = await response.text();
                if(errorText){
                    errorMsg = errorText;
                }
            }
        } catch (error) {
            console.warn("Failed to parse Response ",error)
        }
        throw new Error(errorMsg);
    }
    return response;
}

export default handleApiResponse
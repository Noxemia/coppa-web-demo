import Certificate from "./types/certificate";
import Policy from './types/atomics/policy'
import keys from "./ppc_config";

function pi_policy(cp: Certificate<Policy>): Policy {
    console.log(cp.sign + " ---- " + keys.website_key)
    if(cp.sign != keys.website_key){
        throw new Error("Signature did not match up at unwrapping of policy: pi_policy");
    }
    return cp.content
}

export default pi_policy
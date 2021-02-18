import Policy from './types/atomics/policy'
import Proof from './types/proof'
import Certificate from './types/certificate'
import keys from './ppc_config'
import Consent from './types/atomics/consent'
import Info from './types/atomics/info'


function m_info (info: Info, pc: Proof<Certificate<Consent>>): Certificate<Info> {

    /// Check the key of the website, better logic should be implemented here
    if(pc.sign != keys.website_key){
        throw new Error("key does not match website key")
    }

    return new Certificate<Info>(keys.child_key, info);
    
}

export default m_info
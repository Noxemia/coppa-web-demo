import keys from './ppc_config';
import Consent from './types/atomics/consent';
import Policy from './types/atomics/policy'
import Certificate from './types/certificate';
import Proof from './types/proof';

function p_policy(policy: Policy): Proof<Policy>{

    return new Proof(keys.parent_key, policy)

}


/// I havent really figured out what this means, the proof of policy is generated internally as well so idk why we would need pi_policy
function m_consent(consent: Consent, pp: Proof<Policy>): Certificate<Consent>{

    if(pp.sign != keys.parent_key) throw new Error("Key does not match in m_consent")

    return new Certificate(keys.parent_key, consent)
}

export {p_policy, m_consent}
import { createSelector } from '/libraries/reselect/src/index.js';

import { accountsArray$ } from './account$.js';

import AccountType from '/libraries/account-manager/account-type.js';

const walletAccounts$ = createSelector(
    accountsArray$,
    accounts => accounts && accounts.filter(x => x.type === AccountType.KEYGUARD_LOW)
);

export default createSelector(
    walletAccounts$,
    accounts => accounts && accounts.filter(x => x.balance > 0 && !x.backup
        && (!x.backupCanceled || Date.now() - x.backupCanceled > 1000 * 3600 * 24))[0]
);
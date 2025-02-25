// $$$$$$$\             $$\               $$\ $$\           $$\       
// $$  __$$\            $$ |              $$ |\__|          $$ |      
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\ 
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  / 
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<  
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\ 
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|     
                 
// Copyright (c) 2022 Datalink Contributors. All rights reserved.  

// This source code is licensed under the MIT license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root 
// directory of this source tree.

import { validate as uuidValidate } from 'uuid';
import fetchtoken from './fetchToken'
import jwt from 'jsonwebtoken'
import { env } from 'process'


/**
 * Checks if a given token is valid using {@link prisma} model User.
 * @param {Number} id
 * @param {string} token
 * @returns {boolean} 
 */
export default async function validateToken(id: number, token: string): Promise<Boolean | undefined> {
    try {
        jwt.verify(token, `${env.SECRET}`);
        const exists = await fetchtoken(id, true)
        if (exists == null) {
            return false
        } else if (exists == token) {
            return true
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

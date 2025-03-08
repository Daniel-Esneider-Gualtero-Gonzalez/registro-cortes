import React, { useState } from 'react'

function useLoading() {
    const [loading, setLoading] = useState(false)
    const onLoading = ()=> setLoading(true)
    const offLoading = ()=> setLoading(false)
  return {loading,onLoading,offLoading}
}

export default useLoading
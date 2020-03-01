## IPv4掩码计算

IPv4掩码最大不超过32，此方法计算的ip的最小掩码

```js
/**
 * 计算IPv4的最小掩码
 * @param {*} ip '192.168.3.32'
 * @returns {Number}
 */
function getIPv4Mask(ip) {
  const failTag = -1;
  const ips = ip.split('.');
  let ipBinaryString = '';

  if (typeof ip !== 'string') return failTag;
  if (ips.length < 4) return failTag;

  for (let i = 0; i < ips.length; i++) {
    const num = Number(ips[i]);
    if (num > 255) return failTag;

    const binary = num.toString(2);

    let _8bitBinary = `${binary}`;
    while (_8bitBinary.length < 8) {
      _8bitBinary = `0${_8bitBinary}`;
    }

    ipBinaryString += _8bitBinary;
  }

  return ipBinaryString.lastIndexOf('1') + 1;
}

getIPv4Mask('192.168.3.64');


```


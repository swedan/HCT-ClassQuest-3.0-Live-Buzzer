/* ClassQuest animated avatars: emoji remains the server-side identifier. */
(function () {
  'use strict';
  const files = {'🦊':'fox','🐼':'panda','🦁':'lion','🐯':'tiger','🐧':'penguin','🐨':'koala','🦉':'owl','🐸':'frog','🐙':'octopus','🦄':'unicorn','🐻':'bear','🦋':'butterfly'};
  const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(emoji, extraClass='') {
    const file = files[emoji];
    if (!file) return escape(emoji || '👤');
    return `<span class="cq-avatar-wrap ${escape(extraClass)}"><img class="cq-avatar-gif" src="/assets/avatars/${file}.gif" alt="${file} avatar" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="cq-avatar-fallback" hidden>${escape(emoji)}</span></span>`;
  }
  window.CQAvatar = {render, files};
})();

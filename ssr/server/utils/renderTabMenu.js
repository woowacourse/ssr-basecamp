import { TAB_LIST } from '../constants/tabList.js';

const renderTabMenu = (currentEndpoint) => {
  return TAB_LIST.map((tab) => {
    return /* html */ `
      <li>
        <a href='/${tab.link}'>
          <div class="tab-item ${currentEndpoint === tab.name ? 'selected' : ''}">
            <h3>${tab.description}</h3>
          </div>
        </a>
      </li>
    `;
  });
};

export default renderTabMenu;

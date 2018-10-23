

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bpid` bigint(20) DEFAULT NULL COMMENT 'menuId与bpid组成树图',
  `mpid` bigint(20) DEFAULT NULL COMMENT '大部分情况下与bpid相同，当为动态目录时，mpid=-1',
  `project_name` varchar(64) DEFAULT NULL COMMENT '对应的项目id',
  `controller_name` varchar(64) DEFAULT NULL COMMENT '对应后台系统controlle名称',
  `method_name` varchar(64) DEFAULT NULL COMMENT '对应后台系统method名称',
  `url` varchar(64) DEFAULT NULL COMMENT '对应的api路径',
  `icon` varchar(64) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `route` varchar(64) DEFAULT NULL,
  `visit_type` varchar(64) DEFAULT NULL,
  `check_type` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '数据创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '数据更新时间',
  `delete_flag` int(2) DEFAULT NULL COMMENT '是否删除(0:正常，1删除)',
  PRIMARY KEY (`menu_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2139584651 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', null, null, '${systemName}Cms', 'Dashboard', null, null, null, 'Dashboard', '/dashboard', 'MENU', 'NONE', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2', '1', null, '${systemName}Cms', 'User', null, null, null, '用户', '/user', 'MENU', 'VISIT_CHECK', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('7', '1', null, '${systemName}Cms', 'Post', null, null, null, 'Post', '/post', 'MENU', 'NONE', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('21', '2', '-1', '${systemName}Cms', 'User_$userId', null, null, null, '用户详情', '/user/:userId', 'MENU', 'VISIT_CHECK', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('3', '1', null, '${systemName}Cms', 'request', null, null, 'api', 'Request', '/request', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('4', '1', null, '${systemName}Cms', null, null, null, 'camera-o', 'UI Element', null, 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('41', '4', '4', '${systemName}Cms', 'UIElement_iconfont', null, null, 'heart-o', 'IconFont', '/UIElement/iconfont', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('43', '4', '4', '${systemName}Cms', 'UIElement_dropOption', null, null, 'bars', 'DropOption', '/UIElement/dropOption', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('44', '4', '4', '${systemName}Cms', 'UIElement_search', null, null, 'search', 'Search', '/UIElement/search', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('5', '1', null, '${systemName}Cms', 'Chart', null, null, null, 'Charts', null, 'MENU', 'NONE', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('51', '5', '5', '${systemName}Cms', 'Chart_ECharts', null, null, null, 'ECharts', '/chart/ECharts', 'MENU', 'VISIT_CHECK', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('52', '5', '5', '${systemName}Cms', 'Chart_highCharts', null, null, null, 'highCharts', '/chart/highCharts', 'MENU', 'VISIT_CHECK', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('53', '5', '5', '${systemName}Cms', 'Chart_Recharts', null, null, null, 'Recharts', '/chart/Recharts', 'MENU', 'VISIT_CHECK', null, '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('6', '1', null, '${systemName}Cms', null, null, null, 'setting', 'Test Navigation', null, 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('61', '6', '6', '${systemName}Cms', 'navigation_navigation1', null, null, null, 'Test Navigation1', '/navigation/navigation1', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('62', '6', '6', '${systemName}Cms', 'navigation_navigation2', null, null, null, 'Test Navigation2', '/navigation/navigation2', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('621', '62', '62', '${systemName}Cms', 'navigation_navigation2_navigation1', null, null, null, 'Test Navigation21', '/navigation/navigation2/navigation1', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('622', '62', '62', '${systemName}Cms', 'navigation_navigation2_navigation2', null, null, null, 'Test Navigation22', '/navigation/navigation2/navigation2', 'MENU', null, null, null, '0');
INSERT INTO `menu` VALUES ('2139584630', null, null, '${systemName}Cms', 'App', null, null, null, 'App', '/app', 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584631', null, '2139584630', '${systemName}Cms', 'App', 'logout', '/api/app/logout', null, 'logout', null, 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584632', null, '2139584630', '${systemName}Cms', 'App', 'getAllMenus', '/api/app/getAllMenus', null, '获所所以菜单', null, 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584633', null, '2139584630', '${systemName}Cms', 'App', 'getCookieUser', '/api/app/getCookieUser', null, 'getCookieUser', null, 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584634', null, '1', '${systemName}Cms', 'Dashboard', 'getDashboard', '/api/dashboard/getDashboard', null, 'getDashboard', null, 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584635', null, null, '${systemName}Cms', 'Login', null, null, null, 'Login', '/login', 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584636', null, '2139584635', '${systemName}Cms', 'Login', 'login', '/api/login/login', null, 'login', null, 'API_PATH', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584637', null, '7', '${systemName}Cms', 'Post', 'getPostsByStatus', '/api/posts/getPostsByStatus', null, 'getPostsByStatus', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584638', null, null, '${systemName}Cms', 'Role', null, null, null, 'Role', '/role', 'MENU', 'NONE', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584639', null, '2139584638', '${systemName}Cms', 'Role', 'getAllRoles', '/api/role/getAllRoles', null, '获取所有角色', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584640', null, '2139584638', '${systemName}Cms', 'Role', 'saveRoleMenus', '/api/role/saveRoleMenus', null, '保存角色和菜单对应关系', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584641', null, '2139584638', '${systemName}Cms', 'Role', 'saveRole', '/api/role/saveRole', null, '保存角色', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584642', null, '2139584638', '${systemName}Cms', 'Role', 'getAllRoleWithMenus', '/api/role/getAllRoleWithMenus', null, '获取角色', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-06 17:08:13', '0');
INSERT INTO `menu` VALUES ('2139584643', null, '2139584638', '${systemName}Cms', 'Role', 'scanMenus', '/api/role/scanMenus', null, '扫描系统菜单', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584644', null, '2', '${systemName}Cms', 'User', 'getUsers', '/api/user/getUsers', null, '用户列表', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584645', null, '2', '${systemName}Cms', 'User', 'createUser', '/api/user/createUser', null, '创建用户', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584646', null, '2', '${systemName}Cms', 'User', 'deleteUserByIds', '/api/user/deleteUserByIds', null, '批量删除用户', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584647', null, '2', '${systemName}Cms', 'User', 'deleteUserById', '/api/user/{userId}', null, '删除用户', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584648', null, '2', '${systemName}Cms', 'User', 'patchUser', '/api/user/{userId}', null, '修改用户', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584649', null, '21', '${systemName}Cms', 'User_$userId', 'getUserById', '/api/user/{userId}', null, '获取用户详情', null, 'API_PATH', 'VISIT_CHECK', '2018-09-06 17:02:15', '2018-09-07 11:41:07', '0');
INSERT INTO `menu` VALUES ('2139584650', null, '2139584638', '${systemName}Cms', 'Role', 'getAllMenuWithRoles', '/api/role/getAllMenuWithRoles', null, '获取角色', null, 'API_PATH', 'VISIT_CHECK', '2018-09-07 11:41:07', '2018-09-07 11:41:07', '0');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` varchar(64) NOT NULL COMMENT '角色ID',
  `role_name` varchar(64) NOT NULL COMMENT '角色名称',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int(2) DEFAULT NULL COMMENT '是否删除(0:正常，1删除)',
  `role_type` varchar(64) DEFAULT NULL COMMENT '角色类型 enum',
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('DEFAULT', '默认用户1231234333', '普通默认用户', '2018-09-13 05:41:36', '2018-10-13 02:31:01', '0', null);
INSERT INTO `role` VALUES ('ADMIN', '超级管理员', '超级管理员所有功能', '2018-09-13 05:41:36', '2018-09-20 02:55:18', '0', null);
INSERT INTO `role` VALUES ('DEVELOPER', '开发人员123456fffffff', '开发模式下所有功能123', '2018-09-13 05:41:36', '2018-09-23 04:55:06', '0', null);
INSERT INTO `role` VALUES ('undefined', '测试功能acv1234', '开发模式下所有功能123', '2018-09-18 03:59:47', '2018-10-14 06:24:03', '1', null);
INSERT INTO `role` VALUES ('null', '开发人员123测', '开发人员123456测', '2018-09-18 04:02:31', '2018-10-13 05:46:57', '1', null);
INSERT INTO `role` VALUES ('2018091804043484399651465885', '默认用户assdfffaaa', '开发模式下所有功能123', '2018-09-18 04:04:35', '2018-10-13 05:59:52', '1', null);
INSERT INTO `role` VALUES ('2018091804214474661552399689', '开发人员123456abc', '开发模式下所有功能123', '2018-09-18 04:21:45', '2018-10-13 05:47:24', '1', null);
INSERT INTO `role` VALUES ('2018091804320744296644683182', '开发人员123456abc', '开发模式下所有功能123', '2018-09-18 04:32:07', '2018-10-14 06:24:07', '1', null);
INSERT INTO `role` VALUES ('2018091804335829130777540893', '默认用户', '开发模式下所有功能123', '2018-09-18 04:33:58', '2018-10-14 06:48:12', '0', null);
INSERT INTO `role` VALUES ('2018091804344058472687949443', '开发人员123456abc', '开发模式下所有功能123', '2018-09-18 04:34:41', '2018-10-13 05:48:46', '1', null);
INSERT INTO `role` VALUES ('2018091805262803875207124536', '开发人员123456abcaaaa', '开发模式下所有功能123', '2018-09-18 05:26:28', '2018-10-13 05:48:33', '1', null);
INSERT INTO `role` VALUES ('2018091903132778936890720196', '开发人员123456abc', '开发模式下所有功能123', '2018-09-19 03:13:28', '2018-09-19 03:13:34', '0', null);
INSERT INTO `role` VALUES ('2018091905283741860178349032', '开发人员123456abcaaa', '开发模式下所有功能123', '2018-09-19 05:28:37', '2018-09-19 05:28:44', '0', null);
INSERT INTO `role` VALUES ('2018091905530737600541537247', '开发人员123456', '开发模式下所有功能123', '2018-09-19 05:53:07', '2018-09-19 05:53:12', '0', null);
INSERT INTO `role` VALUES ('2018091905540655739072639141', '开发人员123456', '开发模式下所有功能123', '2018-09-19 05:54:07', '2018-09-19 05:54:17', '0', null);
INSERT INTO `role` VALUES ('2018091905583006373038583967', '开发人员123456abc', '开发模式下所有功能123', '2018-09-19 05:58:30', '2018-09-19 05:58:36', '0', null);
INSERT INTO `role` VALUES ('2018091906045511921848974705', '开发人员123456', '开发模式下所有功能123', '2018-09-19 06:04:55', '2018-09-19 06:05:01', '0', null);
INSERT INTO `role` VALUES ('2018091906063913583141710694', '开发人员123456abc', '开发模式下所有功能123', '2018-09-19 06:06:39', '2018-09-23 02:15:19', '0', null);
INSERT INTO `role` VALUES ('2018091906091928573461629359', '默认用户assdfff', '开发人员123456测', '2018-09-19 06:09:19', '2018-09-19 06:09:23', '0', null);
INSERT INTO `role` VALUES ('2018091915032276718915607915', '开发人员123456', '开发人员123456测', '2018-09-19 15:03:23', '2018-09-19 15:40:49', '0', null);
INSERT INTO `role` VALUES ('2018092002213617503522654819', '开发人员123456', '开发模式下所有功能123', '2018-09-20 02:21:36', '2018-09-20 02:21:43', '0', null);
INSERT INTO `role` VALUES ('2018092002215038684804915653', '开发人员123456abc', '开发人员123456测', '2018-09-20 02:21:50', '2018-09-20 02:21:55', '0', null);
INSERT INTO `role` VALUES ('2018092002521011339551354589', '开发人员123456', '开发模式下所有功能123', '2018-09-20 02:52:10', '2018-09-20 02:55:18', '0', null);
INSERT INTO `role` VALUES ('2018092002521565671301879843', '开发人员123456abc', '开发人员123456测', '2018-09-20 02:52:16', '2018-09-20 02:55:18', '0', null);
INSERT INTO `role` VALUES ('2018092002522210308155335451', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 02:52:22', '2018-09-20 02:55:18', '0', null);
INSERT INTO `role` VALUES ('2018092005092154306631873212', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 05:09:22', '2018-09-20 05:09:42', '0', null);
INSERT INTO `role` VALUES ('2018092005092765941644023717', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 05:09:28', '2018-09-20 05:09:42', '0', null);
INSERT INTO `role` VALUES ('2018092006093668970340729666', '开发人员123456', '开发模式下所有功能123', '2018-09-20 06:09:37', '2018-09-20 06:09:56', '0', null);
INSERT INTO `role` VALUES ('2018092006094726030731664543', '开发人员123456abc', '开发人员123456测', '2018-09-20 06:09:47', '2018-09-20 06:09:56', '0', null);
INSERT INTO `role` VALUES ('2018092006192892977936133718', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:19:29', '2018-09-20 06:19:44', '0', null);
INSERT INTO `role` VALUES ('2018092006193418307985674965', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:19:34', '2018-09-20 06:19:38', '0', null);
INSERT INTO `role` VALUES ('2018092006442387364824498952', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:44:24', '2018-09-20 07:51:11', '0', null);
INSERT INTO `role` VALUES ('2018092006443827147190423610', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:44:38', '2018-09-20 07:32:34', '0', null);
INSERT INTO `role` VALUES ('2018092006503412787278621200', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:50:34', '2018-09-20 07:19:05', '0', null);
INSERT INTO `role` VALUES ('2018092006513726022221835170', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:51:37', '2018-09-20 07:19:05', '0', null);
INSERT INTO `role` VALUES ('2018092006535392900519973672', '开发人员123456', '开发模式下所有功能123', '2018-09-20 06:53:54', '2018-09-20 07:16:28', '0', null);
INSERT INTO `role` VALUES ('2018092006544160742642843469', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:54:42', '2018-09-20 07:08:06', '0', null);
INSERT INTO `role` VALUES ('2018092006572543826354296331', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:57:25', '2018-09-20 07:08:06', '0', null);
INSERT INTO `role` VALUES ('2018092006591555807742951251', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 06:59:16', '2018-09-20 07:11:04', '0', null);
INSERT INTO `role` VALUES ('2018092007052228605251867264', '开发人员123456', '开发模式下所有功能123', '2018-09-20 07:05:22', '2018-09-20 07:11:04', '0', null);
INSERT INTO `role` VALUES ('2018092007074170202730482573', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 07:07:42', '2018-09-20 07:16:28', '0', null);
INSERT INTO `role` VALUES ('2018092007511615226396811074', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 07:51:16', '2018-09-20 07:51:32', '0', null);
INSERT INTO `role` VALUES ('2018092007512294565292607657', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 07:51:23', '2018-09-20 07:51:32', '0', null);
INSERT INTO `role` VALUES ('2018092008024004237973312256', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 08:02:40', '2018-09-20 08:02:50', '0', null);
INSERT INTO `role` VALUES ('2018092008024555469501055774', '开发人员123456abc', '开发人员123456测', '2018-09-20 08:02:46', '2018-09-20 08:02:50', '0', null);
INSERT INTO `role` VALUES ('2018092014370802729672605063', '开发人员123456abc', '开发人员123456测', '2018-09-20 14:37:08', '2018-09-20 14:37:20', '0', null);
INSERT INTO `role` VALUES ('2018092014371389063185202350', '开发人员123456abc', '开发模式下所有功能123', '2018-09-20 14:37:14', '2018-09-20 14:37:20', '0', null);
INSERT INTO `role` VALUES ('2018092014440611551208196563', '开发人员123456', '开发模式下所有功能123', '2018-09-20 14:44:06', '2018-09-20 14:44:38', '0', null);
INSERT INTO `role` VALUES ('2018092014441118980285375768', '开发人员123456abc', '开发人员123456测', '2018-09-20 14:44:11', '2018-09-20 14:44:19', '0', null);
INSERT INTO `role` VALUES ('2018092305153003115762372068', '开发人员123456aaa', '开发模式下所有功能123', '2018-09-23 05:15:30', '2018-09-23 05:15:30', '0', null);
INSERT INTO `role` VALUES ('2018092305182369108907413304', '开发人员123456122', '开发人员123456测', '2018-09-23 05:18:24', '2018-09-23 05:18:24', '0', null);
INSERT INTO `role` VALUES ('2018092808545129461804378225', '开发人员123456', '开发模式下所有功能123', '2018-09-28 08:54:51', '2018-09-28 08:54:51', '0', null);
INSERT INTO `role` VALUES ('2018092809103178339051938626', '开发人员123456', '开发模式下所有功能123', '2018-09-28 09:10:32', '2018-09-28 09:10:32', '0', null);
INSERT INTO `role` VALUES ('2018100205471846352209598621', '开发人员123456abc', '开发人员123456测', '2018-10-02 05:47:18', '2018-10-02 05:47:18', '0', 'DEFAULT');
INSERT INTO `role` VALUES ('2018100206185435190412237112', 'aaaaaaaa', '开发模式下所有功能123', '2018-10-02 06:18:54', '2018-10-02 06:18:54', '0', 'DEFAULT');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` varchar(32) DEFAULT NULL,
  `menu_id` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '数据创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '数据更新时间',
  `delete_flag` int(2) DEFAULT NULL COMMENT '是否删除(0:正常，1删除)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2103243286 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES ('1', 'DEFAULT', '1', null, null, '0');
INSERT INTO `role_menu` VALUES ('2', 'DEFAULT', '2', null, null, '0');
INSERT INTO `role_menu` VALUES ('3', 'DEFAULT', '21', null, null, '0');
INSERT INTO `role_menu` VALUES ('4', 'DEFAULT', '7', null, null, '0');
INSERT INTO `role_menu` VALUES ('5', 'DEFAULT', '5', null, null, '0');
INSERT INTO `role_menu` VALUES ('6', 'DEFAULT', '51', null, null, '0');
INSERT INTO `role_menu` VALUES ('7', 'DEFAULT', '52', null, null, '0');
INSERT INTO `role_menu` VALUES ('8', 'DEFAULT', '53', null, null, '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(64) NOT NULL COMMENT '用户ID',
  `username` varchar(64) DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) DEFAULT NULL COMMENT '密码，测试，明文',
  `role_type` varchar(32) DEFAULT NULL COMMENT '用户角色 ADMIN,DEFAULT,DEVELOPER',
  `name` varchar(64) DEFAULT NULL,
  `nickName` varchar(32) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isMale` tinyint(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `delete_flag` int(2) DEFAULT NULL COMMENT '是否删除(0:正常，1删除)',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=990000199212066855 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0', 'admin', 'admin', 'ADMIN', null, null, null, null, '1', null, null, null, '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('1', 'guest', 'guest', 'DEFAULT', null, null, null, null, '0', null, null, null, '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('2', '吴彦祖', '123456', 'DEVELOPER', null, null, null, null, '1', null, null, null, '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('310000197703268762', 'Davis', null, null, 'Carol Lopez', 'Davis', '94', '台湾 金门�?金湖�?', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=D', null, '1989-11-18 19:02:15', '2018-08-25 04:41:11', '0');
INSERT INTO `user` VALUES ('130000199512102706', 'Perez', null, null, 'Anna Wilson', 'Perez', '62', '海外 海外 -', '0', 'http://dummyimage.com/100x100/f2da79/757575.png&text=P', null, '2007-11-13 17:53:24', '2018-06-29 21:42:54', '0');
INSERT INTO `user` VALUES ('140000197109236934', 'Lewis', null, null, 'Betty Jackson', 'Lewis', '53', '北京 北京�?房山�?', '1', 'http://dummyimage.com/100x100/b779f2/757575.png&text=L', null, '1985-07-05 05:47:33', '2018-08-25 05:00:43', '0');
INSERT INTO `user` VALUES ('500000201010305449', 'Johnson', null, null, 'Gary Hernandez', 'Johnson', '85', '重庆 重庆�?涪陵�?', '0', 'http://dummyimage.com/100x100/79f293/757575.png&text=J', null, '2006-03-15 18:24:19', '2018-06-29 23:44:43', '0');
INSERT INTO `user` VALUES ('620000201703178152', 'Jackson', null, null, 'Charles Davis', 'Jackson', '23', '新疆维吾尔自治区 昌吉回族自治�?木垒哈萨克自治县', '1', 'http://dummyimage.com/100x100/f27981/757575.png&text=J', null, '1996-02-28 08:31:28', '2018-08-25 04:40:43', '0');
INSERT INTO `user` VALUES ('510000198112245536', 'Gonzalez', null, null, 'Susan Brown', 'Gonzalez', '80', '贵州�?安顺�?紫云苗族布依族自治县', '1', 'http://dummyimage.com/100x100/79a5f2/757575.png&text=G', null, '2011-02-26 02:57:37', '2018-06-29 23:49:35', '0');
INSERT INTO `user` VALUES ('540000198212135786', 'Young', null, null, 'Mark Martinez', 'Young', '48', '河北�?承德�?隆化�?', '0', 'http://dummyimage.com/100x100/c8f279/757575.png&text=Y', null, '1994-02-17 00:30:09', '2018-06-30 02:13:08', '0');
INSERT INTO `user` VALUES ('36000020051209568', 'Lee', null, null, 'Christopher Brown', 'Lee', '18', '吉林�?四平�?公主岭市', '1', 'http://dummyimage.com/100x100/f279eb/757575.png&text=L', null, '2013-08-17 22:34:55', '2018-06-30 02:28:21', '0');
INSERT INTO `user` VALUES ('440000200601171218', 'Miller', null, null, 'Thomas Taylor', 'Miller', '25', '辽宁�?朝阳�?其它�?', '1', 'http://dummyimage.com/100x100/79f2d5/757575.png&text=M', null, '2009-01-18 19:42:15', '2018-06-30 02:28:33', '0');
INSERT INTO `user` VALUES ('150000200007123177', 'Thomas', null, null, 'Scott Lee', 'Thomas', '75', '辽宁�?铁岭�?开原市', '1', 'http://dummyimage.com/100x100/f2b279/757575.png&text=T', null, '2000-01-25 05:05:19', '2018-06-30 03:57:27', '0');
INSERT INTO `user` VALUES ('320000201511029880', 'Perez', null, null, 'Margaret Taylor', 'Perez', '30', '内蒙古自治区 包头市 昆都仑区', '1', 'http://dummyimage.com/100x100/8e79f2/757575.png&text=P', null, '2002-07-29 13:40:47', '2018-07-05 06:22:03', '0');
INSERT INTO `user` VALUES ('140000197507127725', 'Lopez', null, null, 'Nancy Rodriguez', 'Lopez', '91', '北京 北京�?顺义�?', '0', 'http://dummyimage.com/100x100/86f279/757575.png&text=L', null, '1997-06-06 18:47:45', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('420000199101226324', 'Lewis', null, null, 'James Brown', 'Lewis', '43', '辽宁�?辽阳�?宏伟�?', '1', 'http://dummyimage.com/100x100/f279aa/757575.png&text=L', null, '1985-07-08 07:20:28', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('640000198701278271', 'Lee', null, null, 'Susan Martinez', 'Lee', '25', '江苏�?盐城�?大丰�?', '0', 'http://dummyimage.com/100x100/79cdf2/757575.png&text=L', null, '2001-05-24 21:11:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('220000198612181488', 'Rodriguez', null, null, 'Amy Allen', 'Rodriguez', '86', '重庆 重庆�?长寿�?', '0', 'http://dummyimage.com/100x100/f0f279/757575.png&text=R', null, '2010-07-16 22:16:59', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('320000201005281610', 'Robinson', null, null, 'Jessica Anderson', 'Robinson', '92', '宁夏回族自治�?固原�?隆德�?', '0', 'http://dummyimage.com/100x100/d079f2/757575.png&text=R', null, '1986-11-27 11:34:53', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('540000197410188032', 'Young', null, null, 'Daniel Walker', 'Young', '33', '重庆 重庆�?巴南�?', '1', 'http://dummyimage.com/100x100/79f2ac/757575.png&text=Y', null, '2012-01-28 07:24:58', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('410000200512289083', 'Rodriguez', null, null, 'Margaret Walker', 'Rodriguez', '74', '福建�?三明�?明溪�?', '0', 'http://dummyimage.com/100x100/f28979/757575.png&text=R', null, '1982-06-16 19:57:27', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('320000200107224313', 'Gonzalez', null, null, 'Edward White', 'Gonzalez', '46', '陕西�?延安�?黄龙�?', '0', 'http://dummyimage.com/100x100/798cf2/757575.png&text=G', null, '2007-08-14 00:15:56', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('140000201804013918', 'Lewis', null, null, 'Jessica Clark', 'Lewis', '78', '北京 北京�?顺义�?', '1', 'http://dummyimage.com/100x100/aff279/757575.png&text=L', null, '2016-01-07 21:19:24', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('990000199212066846', 'Smith', null, null, 'Donna Smith', 'Smith', '51', '内蒙古自治区 巴彦淖尔�?五原�?', '0', 'http://dummyimage.com/100x100/f279d2/757575.png&text=S', null, '2006-05-25 12:50:45', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('610000197504209867', 'Hernandez', null, null, 'Cynthia Walker', 'Hernandez', '35', '天津 天津�?和平�?', '1', 'http://dummyimage.com/100x100/79f2ee/757575.png&text=H', null, '1992-02-20 00:04:42', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('650000198310316877', 'Wilson', null, null, 'Donald Martin', 'Wilson', '57', '安徽�?池州�?石台�?', '0', 'http://dummyimage.com/100x100/f2cb79/757575.png&text=W', null, '2009-04-06 16:13:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('500000199310301503', 'Moore', null, null, 'Steven Clark', 'Moore', '97', '福建�?漳州�?华安�?', '1', 'http://dummyimage.com/100x100/a779f2/757575.png&text=M', null, '2012-10-11 09:51:33', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('450000197803114454', 'Moore', null, null, 'Sharon Gonzalez', 'Moore', '97', '广东�?韶关�?浈江�?', '1', 'http://dummyimage.com/100x100/79f284/757575.png&text=M', null, '2005-11-28 22:20:22', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('230000199112270552', 'Jones', null, null, 'George Wilson', 'Jones', '72', '山西�?朔州�?平鲁�?', '1', 'http://dummyimage.com/100x100/f27991/757575.png&text=J', null, '1985-04-26 15:13:28', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('710000197405163377', 'Anderson', null, null, 'George Hall', 'Anderson', '86', '贵州�?黔西南布依族苗族自治�?普安�?', '1', 'http://dummyimage.com/100x100/79b4f2/757575.png&text=A', null, '1998-08-22 18:26:54', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('63000019840411288', 'Brown', null, null, 'Elizabeth Lopez', 'Brown', '86', '台湾 嘉义�?西区', '1', 'http://dummyimage.com/100x100/d7f279/757575.png&text=B', null, '2002-08-16 12:13:16', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('120000197112047719', 'Lewis', null, null, 'Melissa Smith', 'Lewis', '56', '青海�?玉树藏族自治�?治多�?', '1', 'http://dummyimage.com/100x100/e979f2/757575.png&text=L', null, '1994-06-16 16:53:10', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('430000198401221055', 'Davis', null, null, 'Kimberly Clark', 'Davis', '56', '四川�?攀枝花�?东区', '1', 'http://dummyimage.com/100x100/79f2c5/757575.png&text=D', null, '2002-09-26 02:10:00', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('310000200708037968', 'White', null, null, 'Margaret Hall', 'White', '82', '安徽�?池州�?其它�?', '0', 'http://dummyimage.com/100x100/f2a279/757575.png&text=W', null, '1987-05-27 07:05:21', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('130000199209114376', 'Hernandez', null, null, 'Jason Moore', 'Hernandez', '42', '广西壮族自治�?梧州�?藤县', '1', 'http://dummyimage.com/100x100/7f79f2/757575.png&text=H', null, '1982-05-15 15:22:58', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('130000198801011515', 'Hall', null, null, 'Barbara Hall', 'Hall', '23', '安徽�?马鞍山市 博望�?', '1', 'http://dummyimage.com/100x100/96f279/757575.png&text=H', null, '1970-07-01 19:49:19', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('530000199207135338', 'Clark', null, null, 'Elizabeth Johnson', 'Clark', '19', '海南�?海口�?秀英区', '1', 'http://dummyimage.com/100x100/f279b9/757575.png&text=C', null, '1984-06-09 14:43:38', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('460000199207263577', 'Perez', null, null, 'Paul Walker', 'Perez', '50', '云南�?迪庆藏族自治�?香格里拉�?', '1', 'http://dummyimage.com/100x100/79ddf2/757575.png&text=P', null, '1995-01-16 20:21:42', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('350000199805244821', 'Lopez', null, null, 'Angela Jones', 'Lopez', '56', '贵州�?黔东南苗族侗族自治州 天柱�?', '1', 'http://dummyimage.com/100x100/f2e479/757575.png&text=L', null, '2006-12-18 22:02:10', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('430000201511253255', 'Robinson', null, null, 'Margaret Lewis', 'Robinson', '30', '江西�?鹰潭�?余江�?', '0', 'http://dummyimage.com/100x100/c079f2/757575.png&text=R', null, '1974-06-19 19:40:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('460000200310054752', 'Williams', null, null, 'Kevin Martin', 'Williams', '44', '浙江�?金华�?武义�?', '1', 'http://dummyimage.com/100x100/79f29d/757575.png&text=W', null, '1993-12-02 15:39:04', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('460000198310166770', 'Rodriguez', null, null, 'Cynthia Gonzalez', 'Rodriguez', '79', '海南�?三亚�?-', '1', 'http://dummyimage.com/100x100/f27a79/757575.png&text=R', null, '1975-05-22 03:24:54', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('340000197405075976', 'Anderson', null, null, 'Laura Miller', 'Anderson', '27', '陕西�?咸阳�?旬邑�?', '0', 'http://dummyimage.com/100x100/799bf2/757575.png&text=A', null, '1994-11-10 15:31:20', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('620000199711289098', 'Lewis', null, null, 'Karen Clark', 'Lewis', '26', '贵州�?安顺�?平坝�?', '0', 'http://dummyimage.com/100x100/bef279/757575.png&text=L', null, '1973-06-19 12:39:30', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('420000197209105963', 'Lewis', null, null, 'Paul Taylor', 'Lewis', '49', '云南�?丽江�?玉龙纳西族自治县', '0', 'http://dummyimage.com/100x100/f279e2/757575.png&text=L', null, '2014-11-16 09:12:31', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('640000201108167823', 'Anderson', null, null, 'Karen Taylor', 'Anderson', '97', '云南�?玉溪�?澄江�?', '1', 'http://dummyimage.com/100x100/79f2de/757575.png&text=A', null, '1977-12-28 09:11:53', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('61000019750720106', 'Jones', null, null, 'Brenda Moore', 'Jones', '75', '河南�?许昌�?襄城�?', '0', 'http://dummyimage.com/100x100/f2bb79/757575.png&text=J', null, '2007-01-06 00:26:13', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('440000201301164141', 'Moore', null, null, 'Melissa Davis', 'Moore', '72', '澳门特别行政�?离岛 -', '0', 'http://dummyimage.com/100x100/9879f2/757575.png&text=M', null, '1973-05-31 18:51:42', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('310000198409053829', 'Anderson', null, null, 'Anna Hall', 'Anderson', '62', '辽宁�?营口�?鲅鱼圈区', '0', 'http://dummyimage.com/100x100/7df279/757575.png&text=A', null, '1984-05-20 15:47:27', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('620000197503018657', 'Garcia', null, null, 'Karen Jones', 'Garcia', '60', '黑龙江省 大庆�?肇源�?', '1', 'http://dummyimage.com/100x100/f279a0/757575.png&text=G', null, '1975-01-29 02:04:12', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('120000198012034878', 'Davis', null, null, 'Laura Lewis', 'Davis', '94', '云南�?迪庆藏族自治�?维西傈僳族自治县', '1', 'http://dummyimage.com/100x100/79c4f2/757575.png&text=D', null, '1980-10-28 14:49:33', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('65000019940912516', 'Davis', null, null, 'Maria Garcia', 'Davis', '89', '河南�?新乡�?辉县�?', '0', 'http://dummyimage.com/100x100/e7f279/757575.png&text=D', null, '1987-09-22 10:19:32', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('520000197312111695', 'Jackson', null, null, 'Brenda Martinez', 'Jackson', '29', '天津 天津�?西青�?', '1', 'http://dummyimage.com/100x100/d979f2/757575.png&text=J', null, '1995-06-13 04:18:17', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('610000201411099549', 'Jones', null, null, 'Jessica Williams', 'Jones', '42', '山西�?长治�?其它�?', '0', 'http://dummyimage.com/100x100/79f2b6/757575.png&text=J', null, '2014-10-21 14:18:10', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('140000197312033331', 'Davis', null, null, 'Richard Anderson', 'Davis', '86', '海南�?三沙�?中沙群岛的岛礁及其海�?', '0', 'http://dummyimage.com/100x100/f29379/757575.png&text=D', null, '2016-08-13 03:37:28', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('610000200310269196', 'Wilson', null, null, 'Mary Davis', 'Wilson', '92', '重庆 重庆�?长寿�?', '1', 'http://dummyimage.com/100x100/7982f2/757575.png&text=W', null, '1991-05-24 22:03:11', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('610000197208094444', 'Young', null, null, 'Larry Allen', 'Young', '97', '广东�?佛山�?禅城�?', '1', 'http://dummyimage.com/100x100/a5f279/757575.png&text=Y', null, '2009-06-16 20:36:16', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('420000198702208450', 'Martin', null, null, 'Betty Wilson', 'Martin', '23', '内蒙古自治区 巴彦淖尔�?杭锦后旗', '1', 'http://dummyimage.com/100x100/f279c9/757575.png&text=M', null, '1988-02-17 03:27:57', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('150000200708313424', 'Hall', null, null, 'Sharon Jackson', 'Hall', '28', '广西壮族自治�?北海�?铁山港区', '1', 'http://dummyimage.com/100x100/79ecf2/757575.png&text=H', null, '1973-01-25 02:16:01', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('330000197807113144', 'Hall', null, null, 'Gary Moore', 'Hall', '69', '香港特别行政�?九龙 观塘�?', '1', 'http://dummyimage.com/100x100/f2d479/757575.png&text=H', null, '2015-01-06 09:28:42', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('340000199412194833', 'Martinez', null, null, 'Frank Gonzalez', 'Martinez', '39', '辽宁�?鞍山�?海城�?', '1', 'http://dummyimage.com/100x100/b179f2/757575.png&text=M', null, '2017-06-05 20:06:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('99000020010711723', 'Lewis', null, null, 'Anna Jones', 'Lewis', '46', '澳门特别行政�?离岛 -', '0', 'http://dummyimage.com/100x100/79f28d/757575.png&text=L', null, '2001-01-19 15:36:09', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('650000198707198055', 'Clark', null, null, 'Margaret Martin', 'Clark', '57', '贵州�?铜仁�?江口�?', '1', 'http://dummyimage.com/100x100/f27987/757575.png&text=C', null, '1996-02-10 03:51:20', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('430000201805060870', 'Hernandez', null, null, 'Anthony Walker', 'Hernandez', '58', '四川�?乐山�?沙湾�?', '1', 'http://dummyimage.com/100x100/79aaf2/757575.png&text=H', null, '1971-12-20 16:06:58', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('810000197310122680', 'Moore', null, null, 'Amy Garcia', 'Moore', '87', '台湾 嘉义�?其它�?', '1', 'http://dummyimage.com/100x100/cef279/757575.png&text=M', null, '2012-04-15 04:34:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('440000200012246250', 'Walker', null, null, 'Lisa Rodriguez', 'Walker', '67', '宁夏回族自治�?吴忠�?其它�?', '1', 'http://dummyimage.com/100x100/f279f1/757575.png&text=W', null, '2007-06-12 12:55:50', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('820000199909085688', 'Smith', null, null, 'Deborah Harris', 'Smith', '66', '广西壮族自治�?河池�?其它�?', '0', 'http://dummyimage.com/100x100/79f2cf/757575.png&text=S', null, '1999-04-13 03:28:26', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('150000201001227658', 'Lopez', null, null, 'Margaret Thomas', 'Lopez', '73', '辽宁�?鞍山�?立山�?', '1', 'http://dummyimage.com/100x100/f2ac79/757575.png&text=L', null, '1975-06-04 18:55:17', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('150000199005137879', 'Williams', null, null, 'Mark Jackson', 'Williams', '29', '西藏自治�?昌都地区 洛隆�?', '0', 'http://dummyimage.com/100x100/8879f2/757575.png&text=W', null, '2007-11-21 19:33:57', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('370000200801099953', 'Taylor', null, null, 'Kimberly Wilson', 'Taylor', '82', '山东�?聊城�?莘县', '1', 'http://dummyimage.com/100x100/8cf279/757575.png&text=T', null, '1983-03-16 02:21:26', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('330000201311147198', 'Martinez', null, null, 'David Rodriguez', 'Martinez', '17', '上海 上海�?杨浦�?', '0', 'http://dummyimage.com/100x100/f279b0/757575.png&text=M', null, '1973-05-07 06:09:09', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('450000198009283407', 'Johnson', null, null, 'John Clark', 'Johnson', '17', '内蒙古自治区 巴彦淖尔�?乌拉特中�?', '0', 'http://dummyimage.com/100x100/79d3f2/757575.png&text=J', null, '2013-06-24 12:42:51', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('150000197905192268', 'Robinson', null, null, 'Charles Smith', 'Robinson', '60', '天津 天津�?武清�?', '1', 'http://dummyimage.com/100x100/f2ed79/757575.png&text=R', null, '2009-06-14 11:54:05', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('45000019850123288', 'Lewis', null, null, 'Jose Hall', 'Lewis', '42', '青海�?海南藏族自治�?其它�?', '1', 'http://dummyimage.com/100x100/ca79f2/757575.png&text=L', null, '1992-04-29 19:23:42', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('37000019950812486', 'Lee', null, null, 'Jennifer Lewis', 'Lee', '93', '重庆 重庆�?渝北�?', '0', 'http://dummyimage.com/100x100/79f2a6/757575.png&text=L', null, '1977-07-04 15:52:45', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('440000198311286869', 'Harris', null, null, 'William Harris', 'Harris', '76', '广西壮族自治�?贵港�?覃塘�?', '1', 'http://dummyimage.com/100x100/f28379/757575.png&text=H', null, '2001-08-23 13:47:41', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('540000198209113228', 'Garcia', null, null, 'Mary Perez', 'Garcia', '73', '辽宁�?抚顺�?东洲�?', '0', 'http://dummyimage.com/100x100/7991f2/757575.png&text=G', null, '1998-04-20 20:55:41', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('130000199106081081', 'Thomas', null, null, 'Sandra Martin', 'Thomas', '30', '陕西�?榆林�?神木�?', '1', 'http://dummyimage.com/100x100/b5f279/757575.png&text=T', null, '1985-05-15 17:21:56', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('620000199903143915', 'Walker', null, null, 'Robert Clark', 'Walker', '29', '四川�?成都�?彭州�?', '0', 'http://dummyimage.com/100x100/f279d8/757575.png&text=W', null, '1996-03-02 07:38:34', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('460000201107090250', 'Hall', null, null, 'Steven Lewis', 'Hall', '41', '湖南�?湘潭�?湘乡�?', '0', 'http://dummyimage.com/100x100/79f2e8/757575.png&text=H', null, '2006-10-18 21:22:49', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('520000200606078266', 'Jones', null, null, 'Nancy Jones', 'Jones', '69', '福建�?南平�?松溪�?', '0', 'http://dummyimage.com/100x100/f2c579/757575.png&text=J', null, '1972-06-23 20:27:29', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('540000200608151272', 'Williams', null, null, 'Charles Rodriguez', 'Williams', '65', '吉林�?四平�?双辽�?', '1', 'http://dummyimage.com/100x100/a179f2/757575.png&text=W', null, '1977-09-15 16:07:35', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('420000197506178202', 'Jones', null, null, 'Gary Davis', 'Jones', '29', '甘肃�?金昌�?金川�?', '0', 'http://dummyimage.com/100x100/79f27e/757575.png&text=J', null, '1980-01-10 00:54:34', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('81000019940407368', 'Johnson', null, null, 'Cynthia Hernandez', 'Johnson', '51', '湖北�?孝感�?云梦�?', '1', 'http://dummyimage.com/100x100/f27997/757575.png&text=J', null, '1998-07-04 15:43:00', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('630000200204162954', 'Miller', null, null, 'Scott Williams', 'Miller', '89', '吉林�?辽源�?西安�?', '0', 'http://dummyimage.com/100x100/79baf2/757575.png&text=M', null, '2005-05-16 19:10:53', '2018-06-05 08:38:29', '0');
INSERT INTO `user` VALUES ('990000199212066847', null, null, null, 'abc', 'abccc', '18', '北京 北京市 东城区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=a', null, '2018-06-28 15:00:15', '2018-06-28 15:00:15', '0');
INSERT INTO `user` VALUES ('990000199212066848', null, null, null, 'abc', 'agagsagdsa', '18', '北京 北京市 西城区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=a', null, '2018-06-28 15:15:14', '2018-06-28 15:15:14', '0');
INSERT INTO `user` VALUES ('990000199212066849', null, null, null, 'abc', 'agagsagdsa', '18', '北京 北京市 西城区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=a', null, '2018-06-28 15:15:33', '2018-06-28 15:15:33', '0');
INSERT INTO `user` VALUES ('990000199212066850', null, null, null, 'abc', '12233', '18', '天津 天津市 和平区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=1', null, '2018-06-28 15:22:40', '2018-06-28 15:22:40', '0');
INSERT INTO `user` VALUES ('990000199212066851', null, null, null, 'abc', '12233', '18', '天津 天津市 和平区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=1', null, '2018-06-28 15:23:03', '2018-06-28 15:23:03', '0');
INSERT INTO `user` VALUES ('990000199212066852', null, null, null, 'abc', '12233', '18', '天津 天津市 和平区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=1', null, '2018-06-28 15:23:32', '2018-06-28 15:23:32', '0');
INSERT INTO `user` VALUES ('990000199212066853', null, null, null, 'abc', '12233', '18', '天津 天津市 和平区', '0', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=1', null, '2018-06-28 15:57:14', '2018-06-28 15:57:14', '0');
INSERT INTO `user` VALUES ('990000199212066854', null, null, null, 'sadasga', 'dsagasa', '18', '河北省 秦皇岛市 北戴河区', '1', 'http://dummyimage.com/100x100/79e6f2/757575.png&text=d', null, '2018-06-28 15:58:27', '2018-06-28 15:58:27', '0');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) DEFAULT NULL,
  `role_id` varchar(64) DEFAULT NULL,
  `role_type` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `delete_flag` int(2) DEFAULT NULL COMMENT '是否删除(0:正常，1删除)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2057741544 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user_role
-- ----------------------------

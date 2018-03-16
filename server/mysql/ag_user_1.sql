/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : ag_user_1

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2018-01-18 17:49:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `history`
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` varchar(64) NOT NULL DEFAULT '' COMMENT '64',
  `userid` varchar(32) DEFAULT NULL,
  `name` varchar(255) DEFAULT '""',
  `deskid` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `mres` int(11) DEFAULT '0' COMMENT '下注结果',
  `money` int(11) DEFAULT '0' COMMENT '下注金额',
  `resault` int(64) DEFAULT '0' COMMENT '开机结果',
  `winres` int(11) DEFAULT '0' COMMENT '输赢',
  PRIMARY KEY (`id`),
  KEY `time` (`time`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of history
-- ----------------------------

-- ----------------------------
-- Table structure for `money`
-- ----------------------------
DROP TABLE IF EXISTS `money`;
CREATE TABLE `money` (
  `userid` varchar(32) NOT NULL COMMENT '用户ID',
  `money` int(11) DEFAULT '0' COMMENT '钻石',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `uid` (`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of money
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` varchar(32) NOT NULL COMMENT '用户ID',
  `account` varchar(64) NOT NULL DEFAULT '' COMMENT '账号',
  `name` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `sex` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `uid` (`userid`) USING HASH,
  UNIQUE KEY `acc` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------

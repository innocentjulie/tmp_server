/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : ag_acc

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2018-01-18 17:49:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `accounts`
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `account` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `userid` varchar(32) DEFAULT '0',
  PRIMARY KEY (`account`),
  UNIQUE KEY `acc` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of accounts
-- ----------------------------

-- ----------------------------
-- Table structure for `cfg`
-- ----------------------------
DROP TABLE IF EXISTS `cfg`;
CREATE TABLE `cfg` (
  `maxuid` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cfg
-- ----------------------------
INSERT INTO `cfg` VALUES ('10000');

-- ----------------------------
-- Table structure for `dealer`
-- ----------------------------
DROP TABLE IF EXISTS `dealer`;
CREATE TABLE `dealer` (
  `account` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `logintime` int(11) DEFAULT '0' COMMENT '0',
  `loginouttime` int(11) DEFAULT '0',
  PRIMARY KEY (`account`),
  KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dealer
-- ----------------------------
INSERT INTO `dealer` VALUES ('111111', '96e79218965eb72c92a549dd5a330112', '0', '0');

-- ----------------------------
-- Table structure for `gm`
-- ----------------------------
DROP TABLE IF EXISTS `gm`;
CREATE TABLE `gm` (
  `account` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `logintime` int(11) DEFAULT '0',
  `loginouttime` int(11) DEFAULT '0',
  PRIMARY KEY (`account`),
  KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gm
-- ----------------------------
INSERT INTO `gm` VALUES ('111111', '96e79218965eb72c92a549dd5a330112', '0', '0');

package com.smartcold.manage.cold.dao;

import java.util.List;

import com.smartcold.manage.cold.entity.WarningsInfo;

public interface WarningsInfoMapper {
	
	public List<WarningsInfo> findAllWarningInfo(int rdcId);
}
